import React from 'react';
import {withRouter} from 'react-router-dom';

const Erro404 = ({ location, history }) => (
	<div>
		<p>A página <b>{location.pathname}</b> não existe.</p>
		<p>
			<a href="/home"
				onClick={ev => {
					ev.preventDefault();
					history.push('/home');
				}}>
				Ir para home.
			</a>
		</p>
	</div>
);

export default withRouter(Erro404);
