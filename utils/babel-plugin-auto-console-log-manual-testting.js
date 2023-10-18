import autoConsoleLog from '../dist/babel-plugin-auto-console-log.js';
import Babel from '@babel/standalone';

Babel.registerPlugin('auto-console-log', autoConsoleLog());

const source = `

new Date()

`;

const transform = (code) =>
  Babel.transform(code, {
    plugins: ['auto-console-log']
  }).code;

console.log(transform(source));
