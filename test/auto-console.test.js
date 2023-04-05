const Babel = require('@babel/standalone');

Babel.registerPlugin('autoConsole', require('../lib'));
const autoConsole = (code) =>
  Babel.transform(code, {
    plugins: ['autoConsole']
  })
    .code.replace(/(\r\n|\n|\r)/gm, '')
    .replace(/ /g, '');

describe('autoConsole', () => {
  test('Does not replace console.log', () => {
    const code = 'console.log("Hello, world!");';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      'console.log("Hello, world!");'
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/ /g, '')
    );
  });

  test('Replaces non-console.log calls with console.log', () => {
    const code = 'alert("Hello, world!");';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      'console.log(alert("Hello, world!"));'
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/ /g, '')
    );
  });

  test('Does not replaces referenced identifiers with console.log on a console.log call', () => {
    const code = 'const foo = 42; console.log(foo);';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      'const foo = 42; console.log(foo);'
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/ /g, '')
    );
  });

  test('Does not replace binary expressions with console.log on variable declarations', () => {
    const code = 'const sum = 1 + 2; console.log(sum);';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      'const sum = 1 + 2; console.log(sum);'
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/ /g, '')
    );
  });

  test("Add console.log to a declarated variable that's not using console.log", () => {
    const code = 'const a = 1; a;';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      'const a = 1; console.log(a);'
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/ /g, '')
    );
  });

  test('Does not add console.log to a undeclarated variable', () => {
    const code = 'variable;';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      'variable;'.replace(/(\r\n|\n|\r)/gm, '').replace(/ /g, '')
    );
  });

  test('Do not add console.log to items that are inside a function.', () => {
    const code = 'function sayHi(){const hi = "hi"; hi;}';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      'function sayHi(){const hi = "hi"; hi;}'
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/ /g, '')
    );
  });

  test('Add console.log to a mathematical operation.', () => {
    const code = '1+1;';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      'console.log(1+1);'.replace(/(\r\n|\n|\r)/gm, '').replace(/ /g, '')
    );
  });

  test('Add console.log to a mathematical operation with a variable.', () => {
    const code = 'const n = 3; 1+n;';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      'const n = 3; console.log(1+n);'
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/ /g, '')
    );
  });
});
