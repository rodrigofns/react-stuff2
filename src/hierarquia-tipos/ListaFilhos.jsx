import React from 'react';
import {FontIcon, IconButton} from 'material-ui';
import {subscribeTo} from '_util';

import htStore from './hierarquiaTiposStore';
import './ListaFilhos.sass';

const ListaFilhos = ({ className }) => (
	<div id="ListaFilhos" className={className}>
		{htStore.tipoAtual.filhos.map((idFilho, i) =>
			<div key={i} className="itemFilho">
				<div>{htStore.tipoPorId(idFilho).nome}</div>
				<div className="btns">
					<IconButton
						tooltip="Mover para cima"
						tooltipPosition="top-center">
						<FontIcon className="fa fa-arrow-up"/>
					</IconButton>
					<IconButton
						tooltip="Mover para baixo"
						tooltipPosition="top-center">
						<FontIcon className="fa fa-arrow-down"/>
					</IconButton>
					<IconButton
						tooltip="Remover este filho"
						tooltipPosition="top-center">
						<FontIcon className="fa fa-times"/>
					</IconButton>
				</div>
			</div>
		)}
	</div>
);

export default subscribeTo({ htStore })(ListaFilhos);
