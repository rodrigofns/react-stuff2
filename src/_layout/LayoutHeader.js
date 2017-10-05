import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {AppBar} from '../_util/material';

import LayoutHeaderInfo from './LayoutHeaderInfo';
import rotas from '../rotas';

function tituloApp(pathname) {
	if (pathname !== '/') {
		let rotaAtual = rotas.find(r => r.caminho === pathname);
		return !rotaAtual ? 'SGU' : `SGU - ${rotaAtual.nome}`;
	}
	return 'SGU';
}

class LayoutHeader extends React.Component {
	static propTypes = {
		onMenuClick: PropTypes.func
	};

	render() {
		let { onMenuClick, location } = this.props;
		return (
			<AppBar
				title={tituloApp(location.pathname)}
				iconElementRight={<LayoutHeaderInfo/>}
				onLeftIconButtonTouchTap={onMenuClick}/>
		);
	}
}

export default withRouter(LayoutHeader);
