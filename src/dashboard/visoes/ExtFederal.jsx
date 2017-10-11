import React from 'react';

import httpDashboard from '../httpDashboard';
import Visao from '../visao/Visao';

export default class ExtFederal extends React.Component {
	getOrgaos() {
		return httpDashboard.getOrgaosFederais();
	}

	getAbrangencia(idOrgaoFed) {
		return httpDashboard.getAbrangenciaFederal(idOrgaoFed);
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
