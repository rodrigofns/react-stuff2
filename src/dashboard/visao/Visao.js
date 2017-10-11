import React from 'react';
import PropTypes from 'prop-types';
import {Card, TextField} from 'material-ui';
import {BarraAguarde, removeAcentos} from '_util';

import Mapa from '../mapa/Mapa.js';
import NavegadorZoom from '../mapa/NavegadorZoom';
import jsonMapas from '../mapa/mapas-2d.json';
import './Visao.sass';

export default class Visao extends React.Component {
	static propTypes = {
		idConjuntoInicial: PropTypes.string.isRequired,
		nomeConjuntoInicial: PropTypes.string.isRequired,
		onGetOrgaos: PropTypes.func.isRequired,
		onGetAbrangencia: PropTypes.func.isRequired
	};

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
			nomeHover: '', // atualmente abaixo do cursor
			aguardandoAbrangencia: false
		};
	}

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
			}, () => {
				if (!orgaoSelec.abrangencia) { // dados da abrangência ainda não estão em cache?
					this.setState({ aguardandoAbrangencia: true });
					this.props.onGetAbrangencia(idOrgaoFed)
						.then(dadosAbrang => {
							orgaoSelec.abrangencia = dadosAbrang;
							this.setState({ aguardandoAbrangencia: false });
						});
				}
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
							nomeInicial={this.props.nomeConjuntoInicial}
							pontoSelecionado={this.state.nomeOrgaoSelecionado}
							nomeHover={this.state.nomeHover}
							onClick={this.sobeNivel}/>
						<div className="mapa">
							<BarraAguarde visivel={this.pilhaIdArea.empty}/>
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
				<div className="entreCards"></div>
				<Card>
					<div className="card2">
						<BarraAguarde visivel={this.state.aguardandoAbrangencia}/>
						{!this.state.aguardandoAbrangencia &&
							<div>Card 2</div>
						}
					</div>
				</Card>
			</div>
		);
	}
}