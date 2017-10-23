import React from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';

import css from './ListaTipos.module.css';

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
			<div className={classes(css.listaTipos, className)}>
				{tipos.map((t, i) =>
					<div key={i}
						className={classes(css.itemTipo, {
							[css.selec]: (idTipoAtual === t.id) && !disabled,
							[css.selecDesab]: (idTipoAtual === t.id) && disabled
						})}
						onClick={() => this.selecionaTipo(t)}>
						{t.nome}
						{!t.ativo &&
							<div className={css.Inativo}>(inativo)</div>
						}
					</div>
				)}
			</div>
		);
	}
}
