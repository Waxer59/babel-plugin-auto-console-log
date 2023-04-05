const Babel = require('@babel/standalone');
const autoConsole = require('../lib');

Babel.registerPlugin('autoConsole', autoConsole);

const source = ``;

const transform = (code) =>
  Babel.transform(code, {
    plugins: ['autoConsole']
  }).code;

console.log(transform(source));
