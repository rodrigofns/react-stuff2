import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {AppBar} from '../_util';

import LayoutHeaderInfo from './LayoutHeaderInfo';
import rotas from '../rotas';

class LayoutHeader extends React.Component {
	static propTypes = {
		onMenuClick: PropTypes.func
	};

	tituloApp(pathname) {
		if (pathname !== '/') {
			let rotaAtual = rotas.find(r => r.caminho === pathname);
			return !rotaAtual ? 'SGU' : `SGU - ${rotaAtual.nome}`;
		}
		return 'SGU';
	}

	render() {
		let { onMenuClick, location } = this.props;
		return (
			<AppBar
				title={this.tituloApp(location.pathname)}
				iconElementRight={<LayoutHeaderInfo/>}
				onLeftIconButtonTouchTap={onMenuClick}/>
		);
	}
}

export default withRouter(LayoutHeader);
