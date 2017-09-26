import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';
import Layout from './Layout';

import { purple500, purple700 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: purple500,
		primary2Color: purple700,
		//~ primary3Color: grey400,
		//~ accent1Color: pinkA200,
		//~ accent2Color: grey100,
		//~ accent3Color: grey500,
		//~ textColor: darkBlack,
		//~ alternateTextColor: white,
		//~ canvasColor: white,
		//~ borderColor: grey300,
		//~ disabledColor: fade(darkBlack, 0.3),
		pickerHeaderColor: purple500
		//~ clockCircleColor: fade(darkBlack, 0.07),
		//~ shadowColor: fullBlack,
	}
});

const App = () => (
	<MuiThemeProvider muiTheme={muiTheme}>
		<Layout/>
	</MuiThemeProvider>
);

export default App;
