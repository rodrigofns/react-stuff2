import React from 'react';

import dashboardHttp from '../dashboardHttp';
import jsonMapas from '../mapa/mapas-2d.json';
import Mapa from '../mapa/Mapa.js';
import './ExtFederal.scss';

export default class Federal extends React.Component {
	orgaosFederais = [];

	constructor(props) {
		super(props);
		this.state = { idAreas: ['trfs'], pontos: [] };
	}

	componentDidMount() {
		dashboardHttp.orgaosFederais()
			.then(orgaos => {
				this.orgaosFederais = orgaos;
				this.filtraPontosDaAreaAtual();
			});
	}

	filtraPontosDaAreaAtual() {
		if (!this.orgaosFederais.length) {
			this.setState({ pontos: [] });
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

			let idAreaAtual = this.state.idAreas[ this.state.idAreas.length - 1 ].id;

			if (idAreaAtual === this.state.idAreas[0].id) { // todo o Brasil
				this.setState({
					pontos: this.orgaosFederais
						.filter(orgao => nomeEstaNoFiltro(orgao))
						.map(mapeiaGeoPontos)
				});
			} else if (idAreaAtual.substr(0, 3) === 'trf') { // uma das regiões federais
				this.setState({
					pontos: this.orgaosFederais
						.filter(orgao => orgao.regiao === idAreaAtual && nomeEstaNoFiltro(orgao))
						.map(mapeiaGeoPontos)
				});
			} else {
				this.setState({
					pontos: this.orgaosFederais
						.filter(orgao => orgao.municipio.uf === idAreaAtual && nomeEstaNoFiltro(orgao))
						.map(mapeiaGeoPontos)
				});
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
		let { idAreas, pontos } = this.state;

		return (
			<div id="VisaoFederal">
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
				<div className="mapa">
					<Mapa
						tamanho={{ cx: 550, cy: 443 }}
						raioPonto={[0,4,6,10][idAreas.length]}
						idConjunto={idAreas[idAreas.length - 1]}
						pontos={pontos}
						pontosClicaveis={idAreas.length === 3}
						onHoverArea={this.hoverArea}
						onHoverPonto={this.hoverPonto}
						onClickArea={this.clickArea}
						onClickPonto={this.clickPonto}/>
				</div>
			</div>
		);
	}
}
