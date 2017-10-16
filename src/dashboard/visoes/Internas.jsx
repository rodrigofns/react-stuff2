import React from 'react';

import httpDashboard from '../httpDashboard';
import Visao from '../visao/Visao';

export default class Internas extends React.PureComponent {
	getOrgaos() {
		return httpDashboard.getOrgaosFederais(); // mudar !!!
	}

	getAbrangencia(idOrgaoFed) {
		return httpDashboard.getAbrangenciaFederal(idOrgaoFed); // mudar !!!
	}

	render() {
		return (
			<Visao
				idConjuntoInicial="trfs"
				nomeConjuntoInicial="TRFs"
				onGetOrgaos={this.getOrgaos}
				onGetAbrangencia={this.getAbrangencia}/>
		);
	}
}
