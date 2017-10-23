import React from 'react';

import css from './ListaAbrangencia.module.css';

const ListaAbrangencia = ({ titulo, abrangencia }) => (
	<div className={css.wrap}>
		<div className={css.titulo}>{titulo}: </div>
		{abrangencia.map((un, i) =>
			<div key={i} className={css.unidade}>{un.nome}</div>
		)}
	</div>
);

export default ListaAbrangencia;
