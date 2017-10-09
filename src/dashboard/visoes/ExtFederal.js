import React from 'react';
import {BarraAguarde} from '_util';

import httpDashboard from '../httpDashboard';
import jsonMapas from '../mapa/mapas-2d.json';
import Mapa from '../mapa/Mapa.js';
import './ExtFederal.scss';

export default class Federal extends React.Component {
	orgaosFederais = [];
	pontos = [];

	constructor(props) {
		super(props);
		this.state = { idAreas: [] }; // pilha com cada nível de zoom
	}

	componentDidMount() {
		httpDashboard.orgaosFederais()
			.then(orgaos => {
				this.orgaosFederais = orgaos;
				this.setState({ idAreas: ['trfs'] }); // inicia mostrando regiões federais
			});
	}

	filtraPontosDaAreaAtual() {
		if (!this.orgaosFederais.length) {
			return [];
		} else {
			let nomeEstaNoFiltro = (orgao) => { // filtra os nomes dos órgãos quando o usuário usa o campo de filtro
				return true;
			};
			let mapeiaGeoPontos = (orgao) => ({
				id: orgao.id, // o ID do GeoPonto é o mesmo ID do OrgaoFederal
				nome: orgao.nome,
				lat: orgao.municipio.latitude,
				lng: orgao.municipio.longitude
			});
			let idAreaAtual = this.state.idAreas[ this.state.idAreas.length - 1 ];

			if (idAreaAtual === this.state.idAreas[0]) { // todo o Brasil
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

	}

	hoverPonto = (idPonto) => {

	}

	clickArea = (idArea) => {
		if (this.state.idAreas.length < 3) { // nível máximo de zoom
			this.setState({ idAreas: [ ...this.state.idAreas, idArea ] });
		}
	}

	clickPonto = (idPonto) => {

	}

	sobeNivel = (nivel) => {
		this.setState({ idAreas: this.state.idAreas.slice(0, nivel) });
	}

	render() {
		let { idAreas } = this.state;
		return (
			<div id="VisaoFederal">
				{idAreas.length ? (
					<div className="navegador">
						{idAreas.map((idArea, i) =>
							(i >= 1) ? (
								<div className="navegaAcima" key={i} onClick={() => this.sobeNivel(i)}>
									{(i === 1) ? 'TRFs' : jsonMapas.areas[ idAreas[i - 1] ].nome}
								</div>
							) : null
						)}
						<div className="nivelAtual">
							{(idAreas.length === 1) ? 'TRFs' : jsonMapas.areas[ idAreas[idAreas.length - 1] ].nome}
						</div>
					</div>
				) : null}
				<div className="mapa">
					<BarraAguarde visivel={!idAreas.length}/>
					{idAreas.length ? (
						<Mapa
							visivel={idAreas.length}
							tamanho={{ cx: 550, cy: 443 }}
							raioPonto={[0,4,6,10][idAreas.length]}
							idConjunto={idAreas[idAreas.length - 1]}
							pontos={this.filtraPontosDaAreaAtual(this.pontos)}
							pontosClicaveis={idAreas.length === 3}
							onHoverArea={this.hoverArea}
							onHoverPonto={this.hoverPonto}
							onClickArea={this.clickArea}
							onClickPonto={this.clickPonto}/>
					) : null}
				</div>
			</div>
		);
	}
}
