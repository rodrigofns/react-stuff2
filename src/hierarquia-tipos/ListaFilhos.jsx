import React from 'react';
import {IconBtn, subscribeTo} from '_util';

import htStore from './hierarquiaTiposStore';
import './ListaFilhos.sass';

const ListaFilhos = ({ className }) => (
	<div id="ListaFilhos" className={className}>
		{htStore.tipoAtual.filhos.map((idFilho, i) =>
			<div key={i} className="itemFilho">
				<div>{htStore.tipoPorId(idFilho).nome}</div>
				<div>
					<IconBtn icon="arrow-up"
						tooltip="Mover para cima"
						tooltipPosition="top-center"/>
					<IconBtn icon="arrow-down"
						tooltip="Mover para baixo"
						tooltipPosition="top-center"/>
					<IconBtn icon="times"
						tooltip="Remover este filho"
						tooltipPosition="top-center"/>
				</div>
			</div>
		)}
	</div>
);

export default subscribeTo({ htStore })(ListaFilhos);
