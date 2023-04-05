const Babel = require('@babel/standalone');
const autoConsole = require('../lib');

Babel.registerPlugin('autoConsole', autoConsole);

const source = ``;

const transform = (code) =>
  Babel.transform(code, {
    plugins: ['autoConsole']
  })
    .code.replace(/(\r\n|\n|\r)/gm, '')
    .replace(/ /g, '');

console.log(transform(source));
