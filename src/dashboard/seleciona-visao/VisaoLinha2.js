import React from 'react';
import BotaoVisao from './BotaoVisao';
import visaoState from './visaoState';
import './VisaoLinha.css';

const VisaoLinha2 = ({ visaoAtual2 }) => (
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

export default visaoState.subscribe(VisaoLinha2);
