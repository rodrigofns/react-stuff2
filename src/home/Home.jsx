import React from 'react';
import {authStore, subscribeTo} from '_util';

import css from './Home.module.css';

@subscribeTo({ authStore })
export default class Home extends React.PureComponent {
	render() {
		const { authStore } = this.props;
		return (
			<div>
				<div className={css.titulo}>Sistema de Gestão de Unidades</div>
				<div className={css.info}>
					{authStore.userInfo.nome}<br/>
					{authStore.userInfo.cpf}<br/>
					{authStore.userInfo.perfis.map((p, i) => (
						<div key={i}>{p}</div>
					))}
				</div>
			</div>
		);
	}
}
