import React from 'react';
import PropTypes from 'prop-types';
import {BarraAguarde} from '_util';

import jsonMapas from '../mapa/mapas-2d.json';
import ListaAbrangencia from './ListaAbrangencia';
import './Detalhes.sass';

export default class Detalhes extends React.PureComponent {
	static propTypes = {
		pilhaIdArea: PropTypes.array.isRequired,
		orgaos: PropTypes.array.isRequired,
		idOrgaoSelecionado: PropTypes.number,
		onGetAbrangencia: PropTypes.func.isRequired
	};

	state = {
		consultando: false,
		abrangencia: []
	};

	componentDidUpdate(prevProps, prevState) {
		const { orgaos, idOrgaoSelecionado } = this.props;

		if (prevProps.idOrgaoSelecionado !== idOrgaoSelecionado) {
			if (idOrgaoSelecionado) {
				let orgaoAtual = orgaos.find(orgao => orgao.id === idOrgaoSelecionado);
				this.consultaAbrangencia(orgaoAtual);
			} else {
				this.setState({ abrangencia: [] });
			}
		}
	}

	consultaAbrangencia(orgaoAtual) {
		this.setState({ consultando: true }, () => {
			this.props.onGetAbrangencia(orgaoAtual.id)
				.then(dadosAbrang => {
					this.setState({
						consultando: false,
						abrangencia: dadosAbrang
					});
				});
		});
	}

	calculaQuantidadeOrgaos() {
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
		const { consultando, abrangencia } = this.state;

		return (!pilhaIdArea.empty &&
			<div id="Detalhes">
				<div className="cabecalho">Dados da área</div>
				<div className="corpo">
					<div>Área: {jsonMapas.areas[pilhaIdArea.last].nome}</div>
					<div>Quantidade de órgãos: {this.calculaQuantidadeOrgaos()}</div>
				</div>
				<BarraAguarde visivel={consultando}/>
				{!consultando && !abrangencia.empty &&
					<div>
						<div className="cabecalho">Abrangência</div>
						<div className="corpo abrangencia">
							<ListaAbrangencia titulo="PGFN" abrangencia={abrangencia.unidadesPGFN}/>
							<ListaAbrangencia titulo="Trabalhista" abrangencia={abrangencia.orgaosJusticaTrabalhista}/>
							<ListaAbrangencia titulo="Eleitoral" abrangencia={abrangencia.orgaosJusticaEleitoral}/>
							<ListaAbrangencia titulo="Municípios" abrangencia={abrangencia.municipios}/>
						</div>
					</div>
				}
			</div>
		);
	}
}
