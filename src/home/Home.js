import React from 'react';

import tituloState from '../_layout/tituloState'

class Home extends React.Component {
	componentDidMount() {
		tituloState.titulo = 'Home';
	}

	render() {
		return (
			<div>
				<h2>Home</h2>
			</div>
		);
	}
}

export default Home;
