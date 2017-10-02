import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';

import LayoutHeaderInfo from './LayoutHeaderInfo';
import rotas from './rotas';

const tituloApp = (pathname) => {
	if (pathname !== '/') {
		let rotaAtual = rotas.find(r => r.caminho === pathname);
		return !rotaAtual ? 'SGU' : ('SGU - ' + rotaAtual.nome);
	}
	return 'SGU';
};

const LayoutHeader = ({ onMenuClick, location }) => (
	<AppBar
		title={tituloApp(location.pathname)}
		iconElementRight={<LayoutHeaderInfo/>}
		onLeftIconButtonTouchTap={onMenuClick}/>
);

LayoutHeader.propTypes = {
	onMenuClick: PropTypes.func
};

export default withRouter(LayoutHeader);
