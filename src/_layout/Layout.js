import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {List} from '../_util/material';

import LayoutNav from './LayoutNav';
import LayoutHeader from './LayoutHeader';
import Erro404 from './Erro404';
import rotas from '../rotas';
import './Layout.scss';

class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.divWrap = null;
		this.header = null;
		//this.footer = null;
	}

	toggleMenu = () => {
		let btnElem = this.header.childNodes[0].childNodes[0];
		btnElem.classList.toggle('hamburger180');
		this.divWrap.classList.toggle('hiddenMenu');
		this.header.classList.toggle('hiddenMenu');
		//this.footer.classList.toggle('hiddenMenu');
	}

	componentDidMount() {
		this.toggleMenu(); // inicialmente ficará oculto
	}

	render() {
		return (
			<BrowserRouter>
				<div id="Layout" ref={el => this.divWrap = el}>
					<header ref={el => this.header = el}>
						<LayoutHeader onMenuClick={this.toggleMenu}/>
					</header>
					<div className="body">
						<aside>
							<List>
								{rotas.map((rota, i) =>
									<LayoutNav key={i} to={rota.caminho} onClick={this.toggleMenu}>
										{rota.nome}
									</LayoutNav>
								)}
							</List>
						</aside>
						<main>
							<Switch>
								<Redirect exact from="/" to={rotas[0].caminho}/>
								{rotas.map((rota, i) =>
									<Route key={i} path={rota.caminho} component={rota.componente}/>
								)}
								<Route component={Erro404}/>
							</Switch>
						</main>
					</div>
					{/* <footer id="Layout-footer" ref={el => footer = el}>
						Footer
					</footer> */}
				</div>
			</BrowserRouter>
		);
	}
}

export default Layout;
