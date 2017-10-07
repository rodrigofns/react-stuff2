import React from 'react';

import jsonMapas from '../mapa/mapas-2d.json';
import Mapa from '../mapa/Mapa.js';
import './Federal.scss';

export default class Federal extends React.Component {
	constructor(props) {
		super(props);
		this.state = { idAreas: ['trfs'], pontos: [] };
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
