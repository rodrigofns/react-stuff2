import React from 'react';
import {subscribe} from 'react-app-state';

import SelecionaVisao from './seleciona-visao/SelecionaVisao';
import Internas from './visoes/Internas';
import Geografico from './visoes/Geografico';
import Federal from './visoes/Federal';
import Estadual from './visoes/Estadual';
import Trabalhista from './visoes/Trabalhista';
import Eleitoral from './visoes/Eleitoral';
import visaoState from './seleciona-visao/visaoState';
import './Card1.scss';

@subscribe(visaoState)
export default class Card1 extends React.Component {
	render() {
		let { visaoAtual1, visaoAtual2 } = this.props;
		let comps = {
			'INTERNAS': <Internas/>,
			'GEOGRAFICO': <Geografico/>,
			'FEDERAL': <Federal/>, // subvisões de unidades externas
			'ESTADUAL': <Estadual/>,
			'TRABALHISTA': <Trabalhista/>,
			'ELEITORAL': <Eleitoral/>
		};

		return (
			<div id="Card1">
				<SelecionaVisao/>
				{comps[visaoAtual1 !== 'EXTERNAS' ? visaoAtual1 : visaoAtual2]}
			</div>
		);
	}
}
