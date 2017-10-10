import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {useProp, authStore} from '_util';

import cores from '_layout/cores';
import Layout from '_layout/Layout';
import Login from './login/Login';
import './App.sass';

@useProp({ authStore })
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { verificando: true };
	}

	componentWillMount() {
		authStore.checkAuth()
			.then(() => {
				this.setState({ verificando: false });
			});
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={cores}>
				{this.state.verificando ?
					<div>Carregando...</div> :
					(this.props.authStore.isAuth ? <Layout/> : <Login/>)
				}
			</MuiThemeProvider>
		);
	}
}
