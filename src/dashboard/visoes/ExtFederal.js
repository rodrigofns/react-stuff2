import React from 'react';
import {Card, TextField} from 'material-ui';
import {BarraAguarde, removeAcentos} from '_util';

import httpDashboard from '../httpDashboard';
import Mapa from '../mapa/Mapa.js';
import NavegadorZoom from '../mapa/NavegadorZoom';
import jsonMapas from '../mapa/mapas-2d.json';
import './ExtFederal.sass';

export default class ExtFederal extends React.Component {
	static tamanhoMapa = { cx: 550, cy: 443 };
	static raiosPonto = [0, 4, 6, 10];

	orgaosFederais = [];
	pilhaIdArea = []; // pilha com cada nível de zoom: ['trfs','trf1','am']
	filtro = ''; // filtro dos nomes dos órgãos atualmente exibidos

	constructor(props) {
		super(props);
		this.state = {
			pontos: [],
			idOrgaoSelecionado: null, // um ponto
			nomeOrgaoSelecionado: '',
			nomeHover: '' // atualmente abaixo do cursor
		};
	}

	componentDidMount() {
		httpDashboard.orgaosFederais()
			.then(orgaos => {
				this.orgaosFederais = orgaos;
				this.pilhaIdArea = ['trfs']; // inicia mostrando regiões federais
				this.setState({ pontos: this.filtraPontosDaAreaAtual() });
			});
	}

	filtraPontosDaAreaAtual() {
		if (!this.orgaosFederais.length) {
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
			let idAreaAtual = this.pilhaIdArea[this.pilhaIdArea.length - 1];

			if (idAreaAtual === this.pilhaIdArea[0]) { // todo o Brasil
				return this.orgaosFederais
					.filter(orgao => nomeEstaNoFiltro(orgao))
					.map(mapeiaGeoPontos);
			} else if (idAreaAtual.substr(0, 3) === 'trf') { // uma das regiões federais
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
			this.setState({
				idOrgaoSelecionado: idOrgaoFed,
				nomeOrgaoSelecionado: 'FOO'
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
			<div id="ExtFederal">
				<Card>
					<div className="card1">
						<div className="txtFiltro">
							<TextField fullWidth
								floatingLabelText="Filtro do nome do órgão"
								onChange={this.filtroMudou}/>
						</div>
						<NavegadorZoom
							className="navegador"
							idAreas={this.pilhaIdArea}
							nomeInicial="TRFs"
							pontoSelecionado={this.state.nomeOrgaoSelecionado}
							nomeHover={this.state.nomeHover}
							onClick={this.sobeNivel}/>
						<div className="mapa">
							<BarraAguarde visivel={!this.pilhaIdArea.length}/>
							{this.pilhaIdArea.length > 0 &&
								<Mapa
									tamanho={ExtFederal.tamanhoMapa}
									raioPonto={ExtFederal.raiosPonto[this.pilhaIdArea.length]}
									visivel={this.pilhaIdArea.length}
									idConjunto={this.pilhaIdArea[this.pilhaIdArea.length - 1]}
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
				<div className="entreCards"></div>
				<Card>
					<div className="card2">
						Card 2
					</div>
				</Card>
			</div>
		);
	}
}
