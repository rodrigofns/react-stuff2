import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ListaTipos.sass';

export default class ListaTipos extends React.PureComponent {
	static propTypes = {
		tipos: PropTypes.array,
		className: PropTypes.string,
		onSelecionaTipo: PropTypes.func
	};

	state = {
		idTipoAtual: null
	};

	selecionaTipo(tipo) {
		this.setState({ idTipoAtual: tipo.id }, () => {
			if (this.props.onSelecionaTipo) {
				this.props.onSelecionaTipo(tipo.id);
			}
		});
	}

	render() {
		const { tipos, className } = this.props;
		const { idTipoAtual } = this.state;

		return (
			<div id="ListaTipos" className={className}>
				{tipos.map((t, i) =>
					<div key={i}
						className={classNames('itemTipo', {selec: idTipoAtual === t.id})}
						onClick={() => this.selecionaTipo(t)}>
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
