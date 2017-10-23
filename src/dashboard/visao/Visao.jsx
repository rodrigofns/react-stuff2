import React from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';
import {Card, TextField} from 'material-ui';
import {removeAcentos, WaitBar} from '_util';

import Mapa from '../mapa/Mapa';
import NavegadorZoom from '../mapa/NavegadorZoom';
import jsonMapas from '../mapa/mapas-2d.json';
import Detalhes from './Detalhes';
import css from './Visao.module.css';

export default class Visao extends React.Component {
	static propTypes = {
		idConjuntoInicial: PropTypes.string.isRequired,
		onGetOrgaos: PropTypes.func.isRequired,
		onGetAbrangencia: PropTypes.func.isRequired
	};

	static tamanhoMapa = { cx: 550, cy: 443 };
	static raiosPonto = [0, 4, 6, 10];

	orgaosFederais = [];
	pilhaIdArea = []; // pilha com cada nível de zoom: ['trfs','trf1','am']
	filtro = ''; // filtro dos nomes dos órgãos atualmente exibidos
	state = {
		pontos: [],
		idOrgaoSelecionado: null, // um ponto
		nomeOrgaoSelecionado: '',
		nomeHover: '', // atualmente abaixo do cursor
	};

	componentDidMount() {
		this.props.onGetOrgaos()
			.then(orgaos => {
				this.orgaosFederais = orgaos;
				this.pilhaIdArea = [this.props.idConjuntoInicial];
				this.setState({ pontos: this.filtraPontosDaAreaAtual() });
			});
	}

	filtraPontosDaAreaAtual() {
		if (this.orgaosFederais.empty) {
			return [];
		} else {
			let nomeEstaNoFiltro = (orgao) => { // filtra os nomes dos órgãos quando o usuário usa o campo de filtro
				return removeAcentos(orgao.nome.toLowerCase())
					.indexOf(removeAcentos(this.filtro.toLowerCase())) !== -1;
			};
			let mapeiaGeoPontos = (orgao) => ({
				id: orgao.id, // o ID do GeoPonto é o mesmo ID do OrgaoFederal
				nome: orgao.nome,
				lat: orgao.municipio.latitude,
				lng: orgao.municipio.longitude
			});
			let idAreaAtual = this.pilhaIdArea.last;

			if (idAreaAtual === this.pilhaIdArea[0]) { // todo o Brasil
				return this.orgaosFederais
					.filter(orgao => nomeEstaNoFiltro(orgao))
					.map(mapeiaGeoPontos);
		} else if (this.pilhaIdArea.length === 2) { // segundo nível de zoom, dentro de uma região federal
				return this.orgaosFederais
					.filter(orgao => orgao.regiao === idAreaAtual && nomeEstaNoFiltro(orgao))
					.map(mapeiaGeoPontos);
			} else {
				return this.orgaosFederais
					.filter(orgao => orgao.municipio.uf === idAreaAtual && nomeEstaNoFiltro(orgao))
					.map(mapeiaGeoPontos);
			}
		}
	}

	hoverArea = (idArea) => {
		this.setState({
			nomeHover: idArea ? jsonMapas.areas[idArea].nome : ''
		});
	}

	hoverPonto = (idOrgaoFed) => {
		this.setState({
			nomeHover: idOrgaoFed ?
				this.state.pontos.find(p => p.id === idOrgaoFed).nome : ''
		});
	}

	clickArea = (idArea) => {
		if (idArea && this.pilhaIdArea.length < 3) { // nível máximo de zoom
			this.pilhaIdArea.push(idArea);
			this.setState({
				pontos: this.filtraPontosDaAreaAtual(),
				nomeHover: ''
			});
		}
	}

	clickPonto = (idOrgaoFed) => {
		if (idOrgaoFed) {
			let orgaoSelec = this.orgaosFederais.find(orgao => orgao.id === idOrgaoFed);
			this.setState({
				idOrgaoSelecionado: idOrgaoFed,
				nomeOrgaoSelecionado: orgaoSelec.nome
			});
		}
	}

	sobeNivel = (nivel) => {
		this.pilhaIdArea = this.pilhaIdArea.slice(0, nivel);
		this.setState({
			pontos: this.filtraPontosDaAreaAtual(),
			idOrgaoSelecionado: null,
			nomeOrgaoSelecionado: ''
		});
	}

	filtroMudou = (ev) => {
		this.filtro = ev.target.value;
		this.setState({ pontos: this.filtraPontosDaAreaAtual() });
	}

	render() {
		return (
			<div className={css.wrap}>
				<Card>
					<div className={classes(css.card, css.card1)}>
						<div className={css.txtFiltro}>
							<TextField fullWidth
								floatingLabelText="Filtro do nome do órgão"
								onChange={this.filtroMudou}/>
						</div>
						<NavegadorZoom
							className={css.navegador}
							idAreas={this.pilhaIdArea}
							pontoSelecionado={this.state.nomeOrgaoSelecionado}
							nomeHover={this.state.nomeHover}
							onClick={this.sobeNivel}/>
						<div className={css.mapa}>
							<WaitBar show={this.pilhaIdArea.empty}/>
							{!this.pilhaIdArea.empty &&
								<Mapa
									tamanho={Visao.tamanhoMapa}
									raioPonto={Visao.raiosPonto[this.pilhaIdArea.length]}
									visivel={!this.pilhaIdArea.empty}
									idConjunto={this.pilhaIdArea.last}
									pontos={this.state.pontos}
									pontosClicaveis={this.pilhaIdArea.length === 3}
									idPontoSelecionado={this.state.idOrgaoSelecionado}
									onHoverArea={this.hoverArea}
									onHoverPonto={this.hoverPonto}
									onClickArea={this.clickArea}
									onClickPonto={this.clickPonto}/>
							}
						</div>
					</div>
				</Card>
				<div className={css.entreCards}></div>
				<Card>
					<div className={classes(css.card, css.card2)}>
						<Detalhes
							pilhaIdArea={this.pilhaIdArea}
							orgaos={this.orgaosFederais}
							idOrgaoSelecionado={this.state.idOrgaoSelecionado}
							onGetAbrangencia={this.props.onGetAbrangencia}/>
					</div>
				</Card>
			</div>
		);
	}
}
