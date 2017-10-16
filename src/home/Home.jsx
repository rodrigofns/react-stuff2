import React from 'react';
import {authStore, subscribeTo} from '_util';

import './Home.sass';

const Home = ({ authStore }) => (
	<div id="Home">
		<div className="titulo">Sistema de Gestão de Unidades</div>
		<div className="info">
			{authStore.userInfo.nome}<br/>
			{authStore.userInfo.cpf}<br/>
			{authStore.userInfo.perfis.map((p, i) => (
				<div key={i}>{p}</div>
			))}
		</div>
	</div>
);

export default subscribeTo({ authStore })(Home);
