import React from 'react';
import {useProp} from '../_util';

import SelecionaVisao from './seleciona-visao/SelecionaVisao';
import Internas from './visoes/Internas';
import Geografico from './visoes/Geografico';
import Federal from './visoes/Federal';
import Estadual from './visoes/Estadual';
import Trabalhista from './visoes/Trabalhista';
import Eleitoral from './visoes/Eleitoral';
import visaoStore from './seleciona-visao/visaoStore';
import './Card1.scss';

@useProp({ visaoStore })
export default class Card1 extends React.Component {
	render() {
		let { visaoStore } = this.props;
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
				{comps[visaoStore.visaoAtual1 !== 'EXTERNAS' ?
					visaoStore.visaoAtual1 : visaoStore.visaoAtual2]}
			</div>
		);
	}
}
