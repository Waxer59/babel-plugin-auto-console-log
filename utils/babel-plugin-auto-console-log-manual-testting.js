import autoConsoleLog from '../dist/babel-plugin-auto-console-log.js';
import Babel from '@babel/standalone';

Babel.registerPlugin('auto-console-log', autoConsoleLog());

const source = `
for (const el of null().asd) {
    console.log(el)
}`;

const transform = (code) =>
  Babel.transform(code, {
    plugins: ['auto-console-log']
  }).code;

console.log(transform(source));
