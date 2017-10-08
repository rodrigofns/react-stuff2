import React from 'react';
import PropTypes from 'prop-types';

import cores from '_layout/cores';
import jsonMapas from './mapas-2d.json';

export default class Mapa extends React.Component {
	static propTypes = {
		idConjunto: PropTypes.string.isRequired,
		tamanho: PropTypes.shape({ // idealmente as dimensões do elemento
			cx: PropTypes.number.isRequired,
			cy: PropTypes.number.isRequired
		}).isRequired,
		pontos: PropTypes.array.isRequired,
		pontosClicaveis: PropTypes.bool.isRequired,
		onHoverArea: PropTypes.func,
		onHoverPonto: PropTypes.func,
		onClickArea: PropTypes.func,
		onClickPonto: PropTypes.func
	};

	static GRAF = { // constantes gráficas usadas na plotagem 2D do canvas
		area: { corOn: cores.palette.primary1Color, corOff: 'white', corBorda: 'black', espessura: .25 },
		ponto: { cor: cores.palette.accent1Color, corSelec: cores.palette.primary1Color },
		animacao: { duracao: 250 }
	};

	canvas = null;
	ctx = null;
	area2dPaths = { }; // cache com os caminhos das áreas
	idPrevHover = null; // área|ponto abaixo do cursor; cache para evitar envio de notificações repetidas

	componentDidMount() {
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = this.props.tamanho.cx;
		this.canvas.height = this.props.tamanho.cy;
		this.geraArea2dPaths(this.props.idConjunto);
		this.renderizaMapa(this.props.idConjunto);
	}

	componentWillUpdate(nextProps) {
		this.geraArea2dPaths(nextProps.idConjunto);
		this.renderizaMapa(nextProps.idConjunto);
	}

	geraArea2dPaths(idConjunto) {
		this.area2dPaths = { };
		let conjunto = jsonMapas.conjuntos[idConjunto];
		for (const idArea of conjunto.areas) {
			let area = jsonMapas.areas[idArea];
			this.area2dPaths[idArea] = new Path2D(area.path2d);
		}
	}

	renderizaMapa(idConjunto, idDestaque = null) {

		// Preparação para a plotagem.

		this.canvas.style.cursor = 'default';
		this.ctx.setTransform(1, 0, 0, 1, 0, 0); // reseta scale() e transform()
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		let origem = jsonMapas.origem;
		let conjunto = jsonMapas.conjuntos[idConjunto];
		let escalaMapa = origem.mapa.escala * conjunto.escala;
		let offsetMapa = [ (origem.mapa.offset[0] + conjunto.offset[0]) / escalaMapa,
			(origem.mapa.offset[1] + conjunto.offset[1]) / escalaMapa ];

		this.ctx.scale(escalaMapa, escalaMapa);
		this.ctx.translate(offsetMapa[0], offsetMapa[1]);
		this.ctx.strokeStyle = Mapa.GRAF.area.corBorda;
		this.ctx.lineWidth = Mapa.GRAF.area.espessura / escalaMapa;
		this.ctx.fillStyle = Mapa.GRAF.area.corOff;
		this.ctx.globalAlpha = 1;

		// Renderização das áreas.

		for (const idArea of Object.keys(this.area2dPaths)) {
			this.ctx.globalAlpha = .9;
			this.ctx.fillStyle = (!this.props.pontosClicaveis && idArea === idDestaque) ?
				Mapa.GRAF.area.corOn : Mapa.GRAF.area.corOff;
			this.ctx.fill(this.area2dPaths[idArea]);
			this.ctx.globalAlpha = 1;
			this.ctx.stroke(this.area2dPaths[idArea]);
		}

		// Renderização dos pontos.

		let renderizaUmPonto = (lnglat, cor, alpha, raio) => {
			this.ctx.fillStyle = cor;
			this.ctx.globalAlpha = alpha;
			this.ctx.beginPath();
			this.ctx.arc(lnglat[0], lnglat[1], (this.raioPonto * raio) / escalaMapa, 0, 2 * Math.PI, false);
			this.ctx.fill();
		};

		for (const po of this.props.pontos) {
			let lnglat = this.converteCoords([po.lng, po.lat], origem);
			if (po.id === this.idPontoSelecionado) {
				renderizaUmPonto(lnglat, Mapa.GRAF.ponto.corSelec, .4, 1);
			} else {
				renderizaUmPonto(lnglat, Mapa.GRAF.ponto.cor, .25, 1);
				if (this.props.pontosClicaveis && po.id === idDestaque) {
					renderizaUmPonto(lnglat, Mapa.GRAF.ponto.cor, .25, 2);
				}
			}
		}
	}

	areaOuPontoEmbaixoDoCursor(ev) {
		let canvasRc = this.canvas.getBoundingClientRect();
		let xPos = ev.clientX - canvasRc.left;
		let yPos = ev.clientY - canvasRc.top;

		if (this.props.pontosClicaveis) {
			let origem = jsonMapas.origem;
			let conjunto = jsonMapas.conjuntos[this.props.idConjunto];
			let escalaMapa = origem.mapa.escala * conjunto.escala;

			for (const po of this.props.pontos) {
				let lnglat = this.converteCoords([po.lng, po.lat], origem);
				let reg = new Path2D();
				reg.arc(lnglat[0], lnglat[1], this.raioPonto / escalaMapa, 0, 2 * Math.PI, false);
				if (this.ctx.isPointInPath(reg, xPos, yPos)) {
					return po.id; // ID do ponto abaixo do cursor
				}
			}
		} else {
			for (const idArea of Object.keys(this.area2dPaths)) {
				if (this.ctx.isPointInPath(this.area2dPaths[idArea], xPos, yPos)) {
					return idArea; // ID da área abaixo do cursor
				}
			}
		}

		return null; // cursor não está sobre área nem ponto
	}

	converteCoords(lnglat, origem) {
		let lng = lnglat[0] + 180 - origem.lnglat.offset[0];
		let lat = 90 - lnglat[1] - origem.lnglat.offset[1];
		lng *= origem.lnglat.escala / origem.mapa.escala;
		lat *= origem.lnglat.escala / origem.mapa.escala;
		return [lng, lat]; // longitude e latitude convertidas para a escala do mapa
	}

	canvasMouseMove = (ev) => {
		let idHovered = this.areaOuPontoEmbaixoDoCursor(ev);
		this.canvas.style.cursor = (idHovered !== null) ? 'pointer' : 'default';

		if (idHovered !== this.idPrevHover) {
			this.idPrevHover = idHovered;
			this.renderizaMapa(this.props.idConjunto, idHovered);

			if (this.props.pontosClicaveis && this.props.onHoverPonto) {
				this.props.onHoverPonto(idHovered);
			} else if (!this.props.pontosClicaveis && this.props.onHoverArea) {
				this.props.onHoverArea(idHovered);
			}
		}
	}

	canvasMouseOut = (ev) => {
		this.renderizaMapa(this.props.idConjunto);
	}

	canvasClick = (ev) => {
		if (this.props.pontosClicaveis && this.props.onClickPonto) {
			this.props.onClickPonto(this.idPrevHover);
		} else if (!this.props.pontosClicaveis && this.props.onClickArea) {
			this.props.onClickArea(this.idPrevHover);
		}
		this.renderizaMapa(this.props.idConjunto, this.idPrevHover);
	}

	render() {
		return (
			<canvas
				ref={el => this.canvas = el}
				onMouseMove={this.canvasMouseMove}
				onMouseOut={this.canvasMouseOut}
				onClick={this.canvasClick}>
			</canvas>
		);
	}
}
