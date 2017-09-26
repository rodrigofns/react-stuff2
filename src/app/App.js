import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';
import Layout from './Layout';

const muiTheme = getMuiTheme({ // http://mcg.mbitson.com
	palette: {
		// primary1Color: cyan500,
		// primary2Color: cyan700,
		// primary3Color: grey400,
		// accent1Color: pinkA200,
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
	}
});

const App = () => (
	<MuiThemeProvider muiTheme={muiTheme}>
		<Layout/>
	</MuiThemeProvider>
);

export default App;
