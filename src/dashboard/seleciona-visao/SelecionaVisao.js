import React from 'react';
import VisaoLinha1 from './VisaoLinha1';
import VisaoLinha2 from './VisaoLinha2';
import visaoState from './visaoState';
import './SelecionaVisao.css';

const SelecionaVisao = ({ visaoAtual1 }) => (
	<div id="SelecionaVisao">
		<VisaoLinha1/>
		{visaoAtual1 === 'EXTERNAS' ? (
			<VisaoLinha2/>
		) : null}
	</div>
);

export default visaoState.subscribe(SelecionaVisao);
