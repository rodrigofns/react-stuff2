import React from 'react';

import Mapa from '../mapa/Mapa.js';
import './Federal.scss';

export default class Federal extends React.Component {
	hoverArea = (idArea) => {
		console.log(idArea)
	}

	hoverPonto = (idPonto) => {
		console.log(idPonto)
	}

	clickArea = (idArea) => {
		console.log('click', idArea)
	}

	clickPonto = (idPonto) => {
		console.log('click', idPonto)
	}

	render() {
		return (
			<div id="VisaoFederal">
				<div className="navegador">Navega</div>
				<div className="mapa">
					<Mapa
						idConjunto="trfs"
						tamanho={{ cx: 550, cy: 443 }}
						onHoverArea={this.hoverArea}
						onHoverPonto={this.hoverPonto}
						onClickArea={this.clickArea}
						onClickPonto={this.clickPonto}/>
				</div>
			</div>
		);
	}
}
