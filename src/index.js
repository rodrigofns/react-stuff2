import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './app/AppRoot';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppRoot/>, document.getElementById('root'));
registerServiceWorker();
