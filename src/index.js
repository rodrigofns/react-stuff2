import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import * as mobx from 'mobx';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css';

mobx.useStrict(true); // https://mobx.js.org/refguide/action.html

// https://github.com/eslint/eslint/blob/master/docs/rules/no-extend-native.md
/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
Object.defineProperty(Array.prototype, 'last', {
	get: function() {
		return this[this.length - 1];
	}
});
Object.defineProperty(Array.prototype, 'empty', {
	get: function() {
		return this.length === 0;
	}
});

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
