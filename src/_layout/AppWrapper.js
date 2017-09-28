import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiTheme } from './palette';
import Layout from './Layout';
import Login from '../login/Login';
import loginState from '../login/loginState';

const AppWrapper = ({ estaLogado }) => (
	<MuiThemeProvider muiTheme={muiTheme}>
		{estaLogado ?
			<Layout/> :
			<Login/>
		}
	</MuiThemeProvider>
);

export default loginState.subscribe(AppWrapper, 'estaLogado');
