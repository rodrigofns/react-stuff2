import React from 'react';
import {useProp} from '../../_util';

import BotaoVisao from './BotaoVisao';
import visaoStore from './visaoStore';
import './VisaoLinha.scss';

@useProp({ visaoStore })
export default class VisaoLinha1 extends React.Component {
	render() {
		let { visaoStore } = this.props;
		return (
			<div className="VisaoLinha">
				<BotaoVisao
					selecionado={visaoStore.visaoAtual1 === 'INTERNAS'}
					onClick={() => visaoStore.visaoAtual1 = 'INTERNAS'}>
					Unidades<br/>
					Internas
				</BotaoVisao>
				<BotaoVisao
					selecionado={visaoStore.visaoAtual1 === 'EXTERNAS'}
					onClick={() => visaoStore.visaoAtual1 = 'EXTERNAS'}>
					Unidades<br/>
					Externas
				</BotaoVisao>
				<BotaoVisao
					selecionado={visaoStore.visaoAtual1 === 'GEOGRAFICO'}
					onClick={() => visaoStore.visaoAtual1 = 'GEOGRAFICO'}>
					Geográfico
				</BotaoVisao>
			</div>
		);
	}
}
