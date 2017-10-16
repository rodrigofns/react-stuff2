import React from 'react';

import httpDashboard from '../httpDashboard';
import Visao from '../visao/Visao';

export default class ExtEleitoral extends React.PureComponent {
	getOrgaos() {
		return httpDashboard.getOrgaosFederais(); // mudar !!!
	}

	getAbrangencia(idOrgaoFed) {
		return httpDashboard.getAbrangenciaFederal(idOrgaoFed); // mudar !!!
	}

	render() {
		return (
			<Visao
				idConjuntoInicial="regioes"
				nomeConjuntoInicial="Regiões"
				onGetOrgaos={this.getOrgaos}
				onGetAbrangencia={this.getAbrangencia}/>
		);
	}
}
