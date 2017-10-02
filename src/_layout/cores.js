import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const blue50 = '#e1eaed';
export const blue100 = '#b5cad2';
export const blue200 = '#83a7b4';
export const blue300 = '#518395';
export const blue400 = '#2c697f';
export const blue500 = '#074e68';
export const blue600 = '#064760';
export const blue700 = '#053d55';
export const blue800 = '#04354b';
export const blue900 = '#02253a';
export const blueA100 = '#70beff';
export const blueA200 = '#3da7ff';
export const blueA400 = '#0a90ff';
export const blueA700 = '#0083f0';

export const red50 = '#f3e4e7';
export const red100 = '#e1bac3';
export const red200 = '#cd8d9b';
export const red300 = '#b95f73';
export const red400 = '#aa3c55';
export const red500 = '#9b1a37';
export const red600 = '#931731';
export const red700 = '#89132a';
export const red800 = '#7f0f23';
export const red900 = '#6d0816';
export const redA100 = '#ff9ea8';
export const redA200 = '#ff6b7a';
export const redA400 = '#ff384c';
export const redA700 = '#ff1f35';

const cores = getMuiTheme({ // http://mcg.mbitson.com
	palette: {
		primary1Color: blue500,
		primary2Color: blue700,
		// primary3Color: grey400,
		accent1Color: red500
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
		color: red500
	}
});

export default cores;
