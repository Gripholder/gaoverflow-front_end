import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Question from './Question';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Question />, document.getElementById('root'));
registerServiceWorker();
