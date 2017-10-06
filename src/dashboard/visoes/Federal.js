import React from 'react';
import AppState, {subscribe} from 'react-app-state';

import jsonMapas from '../mapa/mapas-2d.json';
import Mapa from '../mapa/Mapa.js';
import './Federal.scss';

let federalState = new AppState({ idAreas: ['trfs'], pontos: [] });

@subscribe(federalState)
export default class Federal extends React.Component {
	componentDidMount() {
		federalState.set({ idAreas: ['trfs'], pontos: [] }); // reset
	}

	hoverArea = (idArea) => {

	}

	hoverPonto = (idPonto) => {

	}

	clickArea = (idArea) => {
		if (this.props.idAreas.length < 3) { // nível máximo de zoom
			federalState.set({ idAreas: [ ...this.props.idAreas, idArea ] });
		}
	}

	clickPonto = (idPonto) => {

	}

	sobeNivel = (nivel) => {
		federalState.set({ idAreas: this.props.idAreas.slice(0, nivel) });
	}

	render() {
		let { idAreas, pontos } = this.props;

		return (
			<div id="VisaoFederal">
				<div className="navegador">
					{this.props.idAreas.map((idArea, i) =>
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
