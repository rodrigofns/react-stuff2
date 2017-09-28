import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiTheme } from './palette';
import loginState from './login/loginState';
import Login from './login/Login';
import Layout from './layout/Layout';
import './App.css';

const App = ({ isLogged }) => (
	<MuiThemeProvider muiTheme={muiTheme}>
		{isLogged ? <Layout/> : <Login/>}
	</MuiThemeProvider>
);

export default loginState.subscribe(App, 'isLogged');
