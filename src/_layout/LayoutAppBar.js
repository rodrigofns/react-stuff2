import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';

import LayoutLoginInfo from './LayoutLoginInfo';
import rotas from './rotas';

const tituloApp = (pathname) => {
	return (pathname === '/') ? 'SGU' :
		('SGU - ' + rotas.find(r => r.caminho === pathname).nome);
};

const LayoutAppBar = ({ onMenuClick, location }) => (
	<AppBar
		title={tituloApp(location.pathname)}
		iconElementRight={<LayoutLoginInfo/>}
		onLeftIconButtonTouchTap={onMenuClick}/>
);

LayoutAppBar.propTypes = {
	onMenuClick: PropTypes.func
};

export default withRouter(LayoutAppBar);
