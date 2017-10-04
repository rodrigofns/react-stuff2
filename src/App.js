import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {subscribe} from 'react-app-state';

import cores from './_layout/cores';
import Layout from './_layout/Layout';
import Login from './login/Login';
import loginState from './login/loginState';
import './App.scss';

@subscribe(loginState)
export default class App extends React.Component {
	render() {
		let { estaLogado } = this.props;
		return (
			<MuiThemeProvider muiTheme={cores}>
				{estaLogado ?
					<Layout/> :
					<Login/>
				}
			</MuiThemeProvider>
		);
	}
}
