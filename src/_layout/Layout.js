import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import useProp from '../_util/useProp';
import LayoutDrawer from './LayoutDrawer';
import LayoutHeader from './LayoutHeader';
import Erro404 from './Erro404';
import menuStore from './menuStore';
import rotas from '../rotas';
import './Layout.scss';

@useProp({ menuStore })
export default class Layout extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div id="Layout">
					<LayoutDrawer/>
					<header>
						<LayoutHeader onMenuClick={() => this.props.menuStore.aberto = true}/>
					</header>
					<main>
						<Switch>
							<Redirect exact from="/" to={rotas[0].caminho}/>
							{rotas.map((rota, i) =>
								<Route key={i} path={rota.caminho} component={rota.componente}/>
							)}
							<Route component={Erro404}/>
						</Switch>
					</main>
					{/* <footer>footer</footer> */}
				</div>
			</BrowserRouter>
		);
	}
}
