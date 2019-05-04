import React from 'react';
import { render } from 'react-dom';

import { App } from './components/App';
import './style/style.less'

render(
    <App />,
    document.getElementById('app')
);