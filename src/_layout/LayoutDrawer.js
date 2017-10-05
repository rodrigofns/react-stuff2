import React from 'react';
import {withRouter} from 'react-router-dom';
import {subscribe} from 'react-app-state';
import {Drawer, MenuItem} from '../_util/material';

import menuState from './menuState';
import rotas from '../rotas';
import './LayoutDrawer.scss';

@subscribe(menuState)
class LayoutDrawer extends React.Component {
	clicouItem(rota) {
		this.props.history.push(rota.caminho);
		menuState.set({ aberto: false });
	}

	render() {
		return (
			<Drawer docked={false} width={260}
				open={this.props.aberto}
				onRequestChange={open => menuState.set({ aberto: open })}>
				<div id="Drawer-top">
					SGU
				</div>
				{rotas.map((rota, i) =>
					<MenuItem key={i} onClick={() => this.clicouItem(rota)}>
						<i className={`fa fa-${rota.icone} drawerMenuIcone`}></i> {rota.nome}
					</MenuItem>
				)}
			</Drawer>
		);
	}
}

export default withRouter(LayoutDrawer);
