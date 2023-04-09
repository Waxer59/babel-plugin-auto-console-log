import autoConsoleLog from '../src/babel-plugin-auto-console-log.js';
import Babel from '@babel/standalone';

Babel.registerPlugin('autoConsoleLog', autoConsoleLog('HI'));

const source = ``;

const transform = (code) =>
  Babel.transform(code, {
    plugins: ['autoConsoleLog']
  }).code;

console.log(transform(source));
