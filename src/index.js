import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
// import i18n from 'i18next';

import './css/index.scss';
import { App } from './app';

window.$ = window.jQuery = require('jquery');
require('./js/bootstrap.min.js');
require('Utils/bindGa');

ReactDOM.render(<App />, document.getElementById('root'));
