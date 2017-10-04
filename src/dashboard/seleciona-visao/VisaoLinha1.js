import React from 'react';
import {subscribe} from 'react-app-state';
import BotaoVisao from './BotaoVisao';
import visaoState from './visaoState';
import './VisaoLinha.scss';

@subscribe(visaoState)
export default class VisaoLinha1 extends React.Component {
	render() {
		let { visaoAtual1 } = this.props;
		return (
			<div className="VisaoLinha">
				<BotaoVisao
					selecionado={visaoAtual1 === 'INTERNAS'}
					onClick={() => visaoState.set({ visaoAtual1: 'INTERNAS' })}>
					Unidades<br/>
					Internas
				</BotaoVisao>
				<BotaoVisao
					selecionado={visaoAtual1 === 'EXTERNAS'}
					onClick={() => visaoState.set({ visaoAtual1: 'EXTERNAS' })}>
					Unidades<br/>
					Externas
				</BotaoVisao>
				<BotaoVisao
					selecionado={visaoAtual1 === 'GEOGRAFICO'}
					onClick={() => visaoState.set({ visaoAtual1: 'GEOGRAFICO' })}>
					Geográfico
				</BotaoVisao>
			</div>
		);
	}
}
