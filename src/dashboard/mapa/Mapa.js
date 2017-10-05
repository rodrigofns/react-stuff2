import React from 'react';
import PropTypes from 'prop-types';

import jsonMapas from './mapas-2d.json';

export default class Mapa extends React.Component {
	static propTypes = {
		idConjunto: PropTypes.string.isRequired,
		tamanho: PropTypes.shape({ // idealmente as dimensões do elemento
			cx: PropTypes.number.isRequired,
			cy: PropTypes.number.isRequired
		}).isRequired
	};

	static GRAF = { // constantes gráficas usadas na plotagem 2D do canvas
		area: { corOn: '#074e68', corOff: 'white', corBorda: 'black', espessura: .25 },
		ponto: { cor: '#9b1a37', corSelec: '#074e68' },
		animacao: { duracao: 250 }
	};

	canvas = null;
	ctx = null;
	area2dPaths = null; // cache com os caminhos das áreas

	componentDidMount() {
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = this.props.tamanho.cx;
		this.canvas.height = this.props.tamanho.cy;
		this.geraArea2dPaths();
		this.renderizaMapa();
	}

	geraArea2dPaths() {
		this.area2dPaths = { };
		let conjunto = jsonMapas.conjuntos[this.props.idConjunto];
		for (const idArea of conjunto.areas) {
			let area = jsonMapas.areas[idArea];
			this.area2dPaths[idArea] = new Path2D(area.path2d);
		}
	}

	renderizaMapa() {

		// Preparação para a plotagem.

		this.canvas.style.cursor = 'default';
		this.ctx.setTransform(1, 0, 0, 1, 0, 0); // reseta scale() e transform()
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		let origem = jsonMapas.origem;
		let conjunto = jsonMapas.conjuntos[this.props.idConjunto];
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
let idDestaque = null; // virá do hover!
			this.ctx.globalAlpha = .9;
			this.ctx.fillStyle = (!this.pontosClicaveis && idArea === idDestaque) ?
				Mapa.GRAF.area.corOn : Mapa.GRAF.area.corOff;
			this.ctx.fill(this.area2dPaths[idArea]);
			this.ctx.globalAlpha = 1;
			this.ctx.stroke(this.area2dPaths[idArea]);
		}

	}

	render() {
		return <canvas ref={el => this.canvas = el}></canvas>;
	}
}
