import React from 'react';
import classNames from 'classnames';
import {subscribeTo, removeAcentos} from '_util';

import htStore from './hierarquiaTiposStore';
import './ListaTipos.sass';

function estaFiltrado(tipo, filtro) {
	return removeAcentos(tipo.nome).toLowerCase()
		.indexOf(removeAcentos(filtro).toLowerCase()) !== -1;
}

const ListaTipos = ({ htStore, tipos }) => (
	<div id="ListaTipos">
		{htStore.tipos.map((t, i) =>
			estaFiltrado(t, htStore.filtro) &&
			<div key={i}
				className={classNames('itemTipo', {selec: htStore.tipoAtual && htStore.tipoAtual.id === t.id})}
				onClick={() => htStore.selecionaTipo(t.id)}>
				{t.nome}
				{!t.ativo &&
					<div className="inativo">(inativo)</div>
				}
			</div>
		)}
	</div>
);

export default subscribeTo({ htStore })(ListaTipos);
