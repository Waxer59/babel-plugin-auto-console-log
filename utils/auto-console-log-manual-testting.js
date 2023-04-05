const Babel = require('@babel/standalone');
const autoConsole = require('../src/cjs/auto-console-log');

Babel.registerPlugin('autoConsole', autoConsole);

const source = ``;

const transform = (code) =>
  Babel.transform(code, {
    plugins: ['autoConsole']
  }).code;

console.log(transform(source));
