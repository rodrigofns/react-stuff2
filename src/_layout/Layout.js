import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import LayoutDrawer from './LayoutDrawer';
import LayoutHeader from './LayoutHeader';
import Erro404 from './Erro404';
import menuState from './menuState';
import rotas from '../rotas';
import './Layout.scss';

const Layout = () => (
	<BrowserRouter>
		<div id="Layout">
			<LayoutDrawer/>
			<header>
				<LayoutHeader onMenuClick={() => menuState.set({ aberto: true })}/>
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

export default Layout;
