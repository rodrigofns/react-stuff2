import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import { List } from 'material-ui/List';
import './Layout.css';
import ListNav from './ListNav';
import DetalhesSessao from './DetalhesSessao';
import Home from '../home/Home';
import AddAlbum from '../add-album/AddAlbum';

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
							<ListNav to="/">Home</ListNav>
							<ListNav to="/addAlbum">Add album</ListNav>
						</List>
					</aside>
					<main id="Layout-body-content">
						<Route exact path="/" component={Home}/>
						<Route exact path="/addAlbum" component={AddAlbum}/>
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
