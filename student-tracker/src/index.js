import React from 'react';
import {render} from 'react-dom';
import Router from './components/Router.js';
import './css/style.css';

//goes into node_modules and looks for react - this is ES6 modules

render(<Router />, document.querySelector('#main'));
//two things - JSX and a mounting point - where to go to the page

//to get it to the page we need a secondary package, reactDom

//TODO: prettier is an extention for your editor to adjust the punctuation on save