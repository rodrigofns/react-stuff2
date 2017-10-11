import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css';

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
