import getMuiTheme from 'material-ui/styles/getMuiTheme';

import pgfn from './tema.css';

const tema = getMuiTheme({
	fontFamily: pgfn.fonte,
	palette: {
		primary1Color: pgfn.blue500,
		primary2Color: pgfn.blue700,
		// primary3Color: grey400,
		accent1Color: pgfn.red500
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
		color: pgfn.red500
	}
});

export default tema;
