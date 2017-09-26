import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './AppRoot.css';
import * as palette from './palette';
import Layout from './Layout';

const muiTheme = getMuiTheme({ // http://mcg.mbitson.com
	palette: {
		primary1Color: palette.blue500,
		// primary2Color: cyan700,
		// primary3Color: grey400,
		accent1Color: palette.red500
		// accent2Color: grey100,
		// accent3Color: grey500,
		// textColor: darkBlack,
		// alternateTextColor: white,
		// canvasColor: white,
		// borderColor: grey300,
		// disabledColor: fade(darkBlack, 0.3),
		// pickerHeaderColor: cyan500,
		// clockCircleColor: fade(darkBlack, 0.07),
		// shadowColor: fullBlack
	},
	appBar: {
		color: palette.red500
	}
});

const AppRoot = () => (
	<MuiThemeProvider muiTheme={muiTheme}>
		<Layout/>
	</MuiThemeProvider>
);

export default AppRoot;
