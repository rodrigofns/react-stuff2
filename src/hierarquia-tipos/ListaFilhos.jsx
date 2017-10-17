import React from 'react';
import {IconBtn, subscribeTo} from '_util';

import htStore from './hierarquiaTiposStore';
import './ListaFilhos.sass';

const ListaFilhos = ({ className, htStore }) => (
	<div className={className}>
		<table id="ListaFilhos">
			<tbody>
				{htStore.tipoAtualComFilhos.filhos.map((filho, i) =>
					<tr key={i}>
						<td>{filho.nome}</td>
						<td>
							{!htStore.processando && i > 0 &&
								<IconBtn icon="arrow-up" tooltip="Mover para cima" tooltipPosition="top-center"/>
							}
						</td>
						<td>
							{!htStore.processando && i < (htStore.tipoAtualComFilhos.filhos.length - 1) &&
								<IconBtn icon="arrow-down" tooltip="Mover para baixo" tooltipPosition="top-center"/>
							}
						</td>
						<td>
							{!htStore.processando &&
								<IconBtn icon="times" tooltip="Remover este filho" tooltipPosition="top-center"/>
							}
						</td>
					</tr>
				)}
			</tbody>
		</table>
	</div>
);

export default subscribeTo({ htStore })(ListaFilhos);
