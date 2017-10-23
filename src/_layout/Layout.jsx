import React from 'react';
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom';
import {subscribeTo} from '_util';

import rotas from 'rotas';
import LayoutDrawer from './LayoutDrawer';
import LayoutHeader from './LayoutHeader';
import GlobalMsg from './GlobalMsg';
import Erro404 from './Erro404';
import menuStore from './menuStore';
import css from './Layout.module.css';

const Layout = ({ menuStore }) => (
	<BrowserRouter>
		<div className={css.layout}>
			<LayoutDrawer/>
			<header className={css.header}>
				<LayoutHeader onMenuClick={() => menuStore.abreMenu(true)}/>
			</header>
			<main className={css.main}>
				<GlobalMsg className={css.msgs}/>
				<Switch>
					<Redirect exact from="/" to={rotas[0].caminho}/>
					{rotas.map((rota, i) =>
						<Route key={i} path={rota.caminho} component={rota.componente}/>
					)}
					<Route component={Erro404}/>
				</Switch>
			</main>
			{/* <footer className={css.footer}>footer</footer> */}
		</div>
	</BrowserRouter>
);

export default subscribeTo({ menuStore })(Layout);
