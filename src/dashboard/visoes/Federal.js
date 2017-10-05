import React from 'react';

import Mapa from '../mapa/Mapa.js';
import './Federal.scss';

export default class Federal extends React.Component {
	render() {
		return (
			<div id="VisaoFederal">
				<div className="navegador">Navega</div>
				<div className="mapa">
					<Mapa
						idConjunto="trfs"
						tamanho={{ cx: 550, cy: 443 }}/>
				</div>
			</div>
		);
	}
}
