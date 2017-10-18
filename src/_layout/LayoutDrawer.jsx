import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {Drawer, MenuItem} from 'material-ui';
import {subscribeTo} from '_util';

import pgfnDrawer from './pgfn-drawer.png';
import rotas from 'rotas';
import menuStore from './menuStore';
import './LayoutDrawer.sass';

@withRouter
@subscribeTo({ menuStore })
export default class LayoutDrawer extends React.PureComponent {
	static propTypes = {
		width: PropTypes.number
	};

	static defaultProps = {
		width: 260
	};

	clicouItem(rota) {
		this.props.history.push(rota.caminho);
		this.props.menuStore.abreMenu(false);
	}

	render() {
		const { menuStore, width } = this.props;
		return (
			<Drawer docked={false} width={width}
				open={menuStore.aberto} onRequestChange={open => menuStore.abreMenu(open)}>
				<div id="Drawer-top">
					<img src={pgfnDrawer} alt="Logotipo PGFN"/> SGU
				</div>
				{rotas.map((rota, i) =>
					<MenuItem key={i} className="Drawer-item" onClick={() => this.clicouItem(rota)}>
						<i className={`fa fa-${rota.icone} icone`}></i> {rota.nome}
					</MenuItem>
				)}
			</Drawer>
		);
	}
}
