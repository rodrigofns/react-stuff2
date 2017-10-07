import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {subscribe} from 'react-app-state';

import cores from './_layout/cores';
import Layout from './_layout/Layout';
import Login from './login/Login';
import authState from './_util/authState';
import './App.scss';

@subscribe(authState)
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { verificando: true };
	}

	componentWillMount() {
		authState.checkAuth()
			.then(() => {
				this.setState({ verificando: false });
			});
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={cores}>
				{this.state.verificando ?
					<div>Carregando...</div> :
					(this.props.isAuth ? <Layout/> : <Login/>)
				}
			</MuiThemeProvider>
		);
	}
}
