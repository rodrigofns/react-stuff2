import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';

import SelecionaVisao from './SelecionaVisao';
import Internas from './visoes/Internas';
import ExtFederal from './visoes/ExtFederal';
import ExtEstadual from './visoes/ExtEstadual';
import ExtTrabalhista from './visoes/ExtTrabalhista';
import ExtEleitoral from './visoes/ExtEleitoral';
import Geografico from './visoes/Geografico';
import './Card1.sass';


export default class Card1 extends React.Component {
	render() {
		return (
			<div id="Card1">
				<SelecionaVisao/>
				<Switch>
					<Redirect exact from="/dashboard" to="/dashboard/internas"/>
					<Redirect exact from="/dashboard/externas" to="/dashboard/externas/federal"/>
					<Route path="/dashboard/internas" component={Internas}/>
					<Route path="/dashboard/externas/federal" component={ExtFederal}/>
					<Route path="/dashboard/externas/estadual" component={ExtEstadual}/>
					<Route path="/dashboard/externas/trabalhista" component={ExtTrabalhista}/>
					<Route path="/dashboard/externas/eleitoral" component={ExtEleitoral}/>
					<Route path="/dashboard/geografico" component={Geografico}/>
					<Redirect to="/dashboard/internas"/>
				</Switch>
			</div>
		);
	}
}
