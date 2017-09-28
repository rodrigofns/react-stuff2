import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import { List } from 'material-ui/List';
import ListNav from './ListNav';
import DetalhesSessao from './DetalhesSessao';
import rotas from './rotas';
import './Layout.css';

class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.divWrap = null;
		this.header = null;
		this.footer = null;
	}

	toggleMenu = () => {
		let btnElem = this.header.childNodes[0].childNodes[0];
		btnElem.classList.toggle('Layout-hamburger-gone');
		this.divWrap.classList.toggle('Layout-wrap-gone');
		this.header.classList.toggle('Layout-header-gone');
		//this.footer.classList.toggle('Layout-footer-gone');
	}

	componentDidMount() {
		this.toggleMenu();
	}

	render() {
		return (
			<BrowserRouter>
				<div id="Layout-wrap" ref={el => this.divWrap = el}>
					<header id="Layout-header" ref={el => this.header = el}>
						<AppBar title="Sistema de Gestão de Unidades"
							iconElementRight={<DetalhesSessao/>}
							onLeftIconButtonTouchTap={this.toggleMenu}/>
					</header>
					<div id="Layout-body">
						<aside id="Layout-body-left">
							<List>
								{rotas.map((rota, i) =>
									<ListNav key={i} to={rota.caminho} onClick={this.toggleMenu}>{rota.nome}</ListNav>
								)}
							</List>
						</aside>
						<main id="Layout-body-content">
							{rotas.map((rota, i) =>
								<Route exact key={i} path={rota.caminho} component={rota.componente}/>
							)}
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
