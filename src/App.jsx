import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {authStore, withStore} from '_util';

import cores from '_layout/cores';
import Layout from '_layout/Layout';
import Login from './login/Login';
import './App.sass';

@withStore({ authStore })
export default class App extends React.Component {
	componentWillMount() {
		authStore.checkAuth();
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={cores}>
				{this.props.authStore.isAuth ? <Layout/> : <Login/>}
			</MuiThemeProvider>
		);
	}
}