import React from 'react';
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom';
import {subscribeTo} from '_util';

import rotas from 'rotas';
import LayoutDrawer from './LayoutDrawer';
import LayoutHeader from './LayoutHeader';
import GlobalMsg from './GlobalMsg';
import Erro404 from './Erro404';
import menuStore from './menuStore';
import './Layout.sass';

const Layout = ({ menuStore }) => (
	<BrowserRouter>
		<div id="Layout">
			<LayoutDrawer/>
			<header>
				<LayoutHeader onMenuClick={() => menuStore.abreMenu(true)}/>
			</header>
			<main>
				<GlobalMsg className="msgs"/>
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

export default subscribeTo({ menuStore })(Layout);
