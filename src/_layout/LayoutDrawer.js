import React from 'react';
import {withRouter} from 'react-router-dom';
import {useProp, Drawer, MenuItem} from '../_util';

import menuStore from './menuStore';
import rotas from '../rotas';
import './LayoutDrawer.scss';

@withRouter
@useProp({ menuStore })
export default class LayoutDrawer extends React.Component {
	clicouItem(rota) {
		this.props.history.push(rota.caminho);
		this.props.menuStore.aberto = false;
	}

	render() {
		return (
			<Drawer docked={false} width={260}
				open={this.props.menuStore.aberto}
				onRequestChange={open => this.props.menuStore.aberto = open}>
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
