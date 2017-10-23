import React from 'react';
import PropTypes from 'prop-types';
import {withRouter, NavLink} from 'react-router-dom';

import css from './SelecionaVisao.module.css';

@withRouter
export default class SelecionaVisao extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string
	};

	render() {
		const { className, location } = this.props;
		return (
			<div className={className}>
				<div className={css.linha}>
					<NavLink to="/dashboard/internas" className={css.botao} activeClassName={css.selec}>
						Unidades<br/>Internas
					</NavLink>
					<NavLink to="/dashboard/externas" className={css.botao} activeClassName={css.selec}>
						Unidades<br/>Externas
					</NavLink>
					<NavLink to="/dashboard/geografico" className={css.botao} activeClassName={css.selec}>
						Geográfico
					</NavLink>
				</div>
				{location.pathname.startsWith('/dashboard/externas') &&
					<div className={css.linha}>
						<NavLink to="/dashboard/externas/federal" className={css.botao} activeClassName={css.selec}>
							Federal
						</NavLink>
						<NavLink to="/dashboard/externas/estadual" className={css.botao} activeClassName={css.selec}>
							Estadual
						</NavLink>
						<NavLink to="/dashboard/externas/trabalhista" className={css.botao} activeClassName={css.selec}>
							Trabalhista
						</NavLink>
						<NavLink to="/dashboard/externas/eleitoral" className={css.botao} activeClassName={css.selec}>
							Eleitoral
						</NavLink>
					</div>
				}
			</div>
		);
	}
}
