import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import { List } from 'material-ui/List';
import ListNav from './ListNav';
import DetalhesSessao from './DetalhesSessao';
import rotas from './rotas';
import './Layout.css';

const Layout = () => {
	let divWrap = null;
	let header = null;
	//let footer = null;

	return (
		<BrowserRouter>
			<div id="Layout-wrap" ref={el => divWrap = el}>
				<header id="Layout-header" ref={el => header = el}>
					<AppBar title="Layouted"
						iconElementRight={<DetalhesSessao/>}
						onLeftIconButtonTouchTap={ev => {
							let btnElem = header.childNodes[0].childNodes[0];
							btnElem.classList.toggle('Layout-hamburger-gone');
							divWrap.classList.toggle('Layout-wrap-gone');
							header.classList.toggle('Layout-header-gone');
							//footer.classList.toggle('Layout-footer-gone');
						}}/>
				</header>
				<div id="Layout-body">
					<aside id="Layout-body-left">
						<List>
							{rotas.map(rota =>
								<ListNav to={rota.caminho}>{rota.nome}</ListNav>
							)}
						</List>
					</aside>
					<main id="Layout-body-content">
						{rotas.map(rota =>
							<Route exact path={rota.caminho} component={rota.componente}/>
						)}
					</main>
				</div>
				{/* <footer id="Layout-footer" ref={el => footer = el}>
					Footer
				</footer> */}
			</div>
		</BrowserRouter>
	);
};

export default Layout;
