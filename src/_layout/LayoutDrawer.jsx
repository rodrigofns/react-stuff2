import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classes from 'classnames';
import {Drawer, MenuItem} from 'material-ui';
import {subscribeTo} from '_util';

import pgfnDrawer from './pgfn-drawer.png';
import rotas from 'rotas';
import menuStore from './menuStore';
import css from './LayoutDrawer.module.css';

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
				<div className={css.topo}>
					<img className={css.logo} src={pgfnDrawer} alt="Logotipo PGFN"/> SGU
				</div>
				{rotas.map((rota, i) =>
					<MenuItem key={i} className={css.item} onClick={() => this.clicouItem(rota)}>
						<i className={classes('fa', `fa-${rota.icone}`, css.icone)}></i> {rota.nome}
					</MenuItem>
				)}
			</Drawer>
		);
	}
}
