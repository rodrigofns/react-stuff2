import React from 'react';
import PropTypes from 'prop-types';
import {withRouter, NavLink} from 'react-router-dom';

import './SelecionaVisao.sass';

const SelecionaVisao = ({ className, location }) => (
	<div id="SelecionaVisao" className={className}>
		<div className="linha">
			<NavLink to="/dashboard/internas" className="botao" activeClassName="botaoSelec">
				Unidades<br/>Internas
			</NavLink>
			<NavLink to="/dashboard/externas" className="botao" activeClassName="botaoSelec">
				Unidades<br/>Externas
			</NavLink>
			<NavLink to="/dashboard/geografico" className="botao" activeClassName="botaoSelec">
				Geográfico
			</NavLink>
		</div>
		{location.pathname.startsWith('/dashboard/externas') &&
			<div className="linha">
				<NavLink to="/dashboard/externas/federal" className="botao" activeClassName="botaoSelec">
					Federal
				</NavLink>
				<NavLink to="/dashboard/externas/estadual" className="botao" activeClassName="botaoSelec">
					Estadual
				</NavLink>
				<NavLink to="/dashboard/externas/trabalhista" className="botao" activeClassName="botaoSelec">
					Trabalhista
				</NavLink>
				<NavLink to="/dashboard/externas/eleitoral" className="botao" activeClassName="botaoSelec">
					Eleitoral
				</NavLink>
			</div>
		}
	</div>
);

SelecionaVisao.propTypes = {
	className: PropTypes.string
};

export default withRouter(SelecionaVisao);
