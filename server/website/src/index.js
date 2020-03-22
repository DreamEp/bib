import React from 'react';
import ReactDOM from 'react-dom';
//import our app.js file
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

console.log("hello")
//start to render with react side our website when we are calling npm start command
//then the render called our app.js file
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
