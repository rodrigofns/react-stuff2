import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import cores from './_layout/cores';
import Layout from './_layout/Layout';
import Login from './login/Login';
import loginState from './login/loginState';
import './App.css';

const App = ({ estaLogado }) => (
	<MuiThemeProvider muiTheme={cores}>
		{estaLogado ?
			<Layout/> :
			<Login/>
		}
	</MuiThemeProvider>
);

export default loginState.subscribe(App);
