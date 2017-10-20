import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ListaTipos.sass';

export default class ListaTipos extends React.PureComponent {
	static propTypes = {
		tipos: PropTypes.array,
		disabled: PropTypes.bool,
		className: PropTypes.string,
		onSelecionaTipo: PropTypes.func
	};

	state = {
		idTipoAtual: null
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.tipos.length !== nextProps.tipos.length) {
			this.setState({ idTipoAtual: null }); // se um tipo foi adicionado/removido, limpa seleção
		}
	}

	selecionaTipo(tipo) {
		if (!this.props.disabled) {
			this.setState({ idTipoAtual: tipo.id }, () => {
				if (this.props.onSelecionaTipo) {
					this.props.onSelecionaTipo(tipo.id);
				}
			});
		}
	}

	render() {
		const { tipos, disabled, className } = this.props;
		const { idTipoAtual } = this.state;

		return (
			<div id="ListaTipos" className={className}>
				{tipos.map((t, i) =>
					<div key={i}
						className={classNames(
							'itemTipo',
							{selec: (idTipoAtual === t.id) && !disabled},
							{selecDesab: (idTipoAtual === t.id) && disabled}
						)}
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
