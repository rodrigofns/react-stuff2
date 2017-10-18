import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {subscribeTo, removeAcentos} from '_util';

import htStore from './hierarquiaTiposStore';
import './ListaTipos.sass';

@subscribeTo({ htStore })
export default class ListaTipos extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string
	};

	estaFiltrado(tipo, filtro) {
		return removeAcentos(tipo.nome).toLowerCase()
			.indexOf(removeAcentos(filtro).toLowerCase()) !== -1;
	}

	render() {
		const { htStore, className } = this.props;
		return (
			<div id="ListaTipos" className={className}>
				{htStore.tipos.map((t, i) =>
					this.estaFiltrado(t, htStore.filtro) &&
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
	}
}
