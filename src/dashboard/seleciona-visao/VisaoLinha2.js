import React from 'react';
import {subscribe} from 'react-app-state';
import BotaoVisao from './BotaoVisao';
import visaoState from './visaoState';
import './VisaoLinha.scss';

@subscribe(visaoState)
export default class VisaoLinha2 extends React.Component {
	render() {
		let { visaoAtual2 } = this.props;
		return (
			<div className="VisaoLinha">
				<BotaoVisao
					selecionado={visaoAtual2 === 'FEDERAL'}
					onClick={() => visaoState.set({ visaoAtual2: 'FEDERAL' })}>
					Federal
				</BotaoVisao>
				<BotaoVisao
					selecionado={visaoAtual2 === 'ESTADUAL'}
					onClick={() => visaoState.set({ visaoAtual2: 'ESTADUAL' })}>
					Estadual
				</BotaoVisao>
				<BotaoVisao
					selecionado={visaoAtual2 === 'TRABALHISTA'}
					onClick={() => visaoState.set({ visaoAtual2: 'TRABALHISTA' })}>
					Trabalhista
				</BotaoVisao>
				<BotaoVisao
					selecionado={visaoAtual2 === 'ELEITORAL'}
					onClick={() => visaoState.set({ visaoAtual2: 'ELEITORAL' })}>
					Eleitoral
				</BotaoVisao>
			</div>
		);
	}
}
