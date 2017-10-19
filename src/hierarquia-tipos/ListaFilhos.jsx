import React from 'react';
import PropTypes from 'prop-types';
import {DialogOkCancel, MiniIconButton, subscribeTo} from '_util';

import htStore from './hierarquiaTiposStore';
import './ListaFilhos.sass';

@subscribeTo({ htStore })
export default class ListaFilhos extends React.Component {
	static propTypes = {
		className: PropTypes.string
	};

	dlgOk = null;

	removeFilho = (filho, i) => {
		this.dlgOk.show(`Deseja remover o tipo filho "${filho.nome}"?`,
			resp => {
				if (resp) {
					htStore.removeFilho(i);
				}
			});
	}

	render() {
		const { className, htStore } = this.props;
		return (
			<div className={className}>
				<table id="ListaFilhos">
					<tbody>
						{htStore.tipoAtualComFilhos.filhos.map((filho, i) =>
							<tr key={i}>
								<td>{filho.nome}</td>
								<td>
									{!htStore.processando && i > 0 &&
										<MiniIconButton icon="arrow-up"
											tooltip="Mover para cima" tooltipPosition="top-center"
											onClick={() => htStore.moveFilhoAcima(i)}/>
									}
								</td>
								<td>
									{!htStore.processando && i < (htStore.tipoAtualComFilhos.filhos.length - 1) &&
										<MiniIconButton icon="arrow-down"
											tooltip="Mover para baixo" tooltipPosition="top-center"
											onClick={() => htStore.moveFilhoAbaixo(i)}/>
									}
								</td>
								<td>
									{!htStore.processando &&
										<MiniIconButton icon="times"
											tooltip="Remover este filho" tooltipPosition="top-center"
											onClick={() => this.removeFilho(filho, i)}/>
									}
								</td>
							</tr>
						)}
					</tbody>
				</table>
				<DialogOkCancel ref={elem => this.dlgOk = elem}/>
			</div>
		);
	}
}
