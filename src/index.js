import React from 'react';
import ReactDOM from 'react-dom';

import "./js/bootstrap.min.js";
import "./js/material.min.js";
import "./js/material-kit.js";

import './css/index.scss';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
