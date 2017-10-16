import React from 'react';
import {withRouter} from 'react-router-dom';
import {Drawer, MenuItem} from 'material-ui';
import {subscribeTo} from '_util';

import pgfnDrawer from './pgfn-drawer.png';
import rotas from 'rotas';
import menuStore from './menuStore';
import './LayoutDrawer.sass';

@withRouter
@subscribeTo({ menuStore })
export default class LayoutDrawer extends React.Component {
	clicouItem(rota) {
		this.props.history.push(rota.caminho);
		this.props.menuStore.abreMenu(false);
	}

	render() {
		return (
			<Drawer docked={false} width={260}
				open={this.props.menuStore.aberto}
				onRequestChange={open => this.props.menuStore.abreMenu(open)}>
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
