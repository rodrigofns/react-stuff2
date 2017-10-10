import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';

import './SelecionaVisao.sass';

@withRouter
export default class SelecionaVisao extends React.Component {
	render() {
		return (
			<div id="SelecionaVisao">
				<div className="linha">
					{['Internas', 'Externas', 'Geográfico'].map((visao, i) =>
						<NavLink
							key={i}
							to={'/dashboard/' + visao.toLowerCase().replace(/á/g, 'a')}
							className="botao"
							activeClassName="botaoSelec">
							{visao}
						</NavLink>
					)}
				</div>
				{this.props.location.pathname.startsWith('/dashboard/externas') &&
					<div className="linha">
						{['Federal', 'Estadual', 'Trabalhista', 'Eleitoral'].map((visao, i) =>
							<NavLink
								key={i}
								to={'/dashboard/externas/' + visao.toLowerCase()}
								className="botao"
								activeClassName="botaoSelec">
								{visao}
							</NavLink>
						)}
					</div>
				}
			</div>
		);
	}
}
