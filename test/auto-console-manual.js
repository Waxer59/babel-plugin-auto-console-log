const Babel = require('@babel/standalone');
Babel.registerPlugin('autoConsole', require('../lib'));

const source = ``

const autoConsole = (code) =>
  Babel.transform(code, {
    plugins: ['autoConsole']
  })
    .code.replace(/(\r\n|\n|\r)/gm, '')
    .replace(/ /g, '');

console.log(autoConsole(source));