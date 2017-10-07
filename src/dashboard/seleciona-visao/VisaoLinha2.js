import React from 'react';
import {useProp} from '../../_util';

import BotaoVisao from './BotaoVisao';
import visaoStore from './visaoStore';
import './VisaoLinha.scss';

@useProp({ visaoStore })
export default class VisaoLinha2 extends React.Component {
	render() {
		let { visaoStore } = this.props;
		return (
			<div className="VisaoLinha">
				<BotaoVisao
					selecionado={visaoStore.visaoAtual2 === 'FEDERAL'}
					onClick={() => visaoStore.visaoAtual2 = 'FEDERAL'}>
					Federal
				</BotaoVisao>
				<BotaoVisao
					selecionado={visaoStore.visaoAtual2 === 'ESTADUAL'}
					onClick={() => visaoStore.visaoAtual2 = 'ESTADUAL'}>
					Estadual
				</BotaoVisao>
				<BotaoVisao
					selecionado={visaoStore.visaoAtual2 === 'TRABALHISTA'}
					onClick={() => visaoStore.visaoAtual2 = 'TRABALHISTA'}>
					Trabalhista
				</BotaoVisao>
				<BotaoVisao
					selecionado={visaoStore.visaoAtual2 === 'ELEITORAL'}
					onClick={() => visaoStore.visaoAtual2 = 'ELEITORAL'}>
					Eleitoral
				</BotaoVisao>
			</div>
		);
	}
}
