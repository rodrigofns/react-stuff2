import React from 'react';
import BotaoVisao from './BotaoVisao';
import visaoState from './visaoState';
import './VisaoLinha.css';

const VisaoLinha1 = ({ visaoAtual1 }) => (
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

export default visaoState.subscribe(VisaoLinha1);
