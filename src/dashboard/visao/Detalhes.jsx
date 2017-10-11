import React from 'react';
import PropTypes from 'prop-types';

import jsonMapas from '../mapa/mapas-2d.json';
import './Detalhes.sass';

export default class Detalhes extends React.Component {
	static propTypes = {
		pilhaIdArea: PropTypes.array.isRequired,
		orgaos: PropTypes.array.isRequired
	};

	quantidadeOrgaos() {
		const { pilhaIdArea, orgaos } = this.props;
		if (pilhaIdArea.length === 1) { // nacional
			return orgaos.length;
		} else { // de uma área
			return orgaos.reduce((tot, orgao) =>
				(orgao.regiao === pilhaIdArea.last || orgao.municipio.uf === pilhaIdArea.last) ?
					++tot : tot,
				0);
		}
	}

	render() {
		const { pilhaIdArea } = this.props;
		return (!pilhaIdArea.empty &&
			<div id="Detalhes">
				<div className="cabecalho">Dados da área</div>
				<div className="corpo">
					<div>Área: {jsonMapas.areas[pilhaIdArea.last].nome}</div>
					<div>Quantidade de órgãos: {this.quantidadeOrgaos()}</div>
				</div>
			</div>
		);
	}
}
