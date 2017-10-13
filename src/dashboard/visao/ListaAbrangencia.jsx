import React from 'react';

import './ListaAbrangencia.sass';

const ListaAbrangencia = ({ titulo, abrangencia }) => (
	<div className="ListaAbrangencia">
		<div className="titulo">{titulo}: </div>
		{abrangencia.map((un, i) =>
			<div key={i} className="unidade">{un.nome}</div>
		)}
	</div>
);

export default ListaAbrangencia;
