const Babel = require('@babel/standalone');

Babel.registerPlugin(
  'autoConsole',
  require('../dist/babel-plugin-auto-console-log.cjs')()
);

const clearInput = (input) =>
  input.replace(/(\r\n|\n|\r)/gm, '').replace(/ /g, '');

const autoConsole = (code) =>
  clearInput(Babel.transform(code, { plugins: ['autoConsole'] }).code);

describe('Specific cases', () => {
  test('Does not replace console.log', () => {
    const code = 'console.log("Hello, world!");';
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput('console.log("Hello, world!");'));
  });

  test('Replaces non-console.log calls with console.log', () => {
    const code = 'alert("Hello, world!");';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput('console.log(alert("Hello, world!"));')
    );
  });

  test('Does not replaces referenced identifiers with console.log on a console.log call', () => {
    const code = 'const foo = 42; console.log(foo);';
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput('const foo = 42; console.log(foo);'));
  });

  test('Does not replace binary expressions with console.log on variable declarations', () => {
    const code = 'const sum = 1 + 2; console.log(sum);';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput('const sum = 1 + 2; console.log(sum);')
    );
  });

  test("Add console.log to a declarated variable that's not using console.log", () => {
    const code = 'const a = 1; a;';
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput('const a = 1; console.log(a);'));
  });

  test('Does not add console.log to a undeclarated variable', () => {
    const code = 'variable;';
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput('variable;'));
  });

  test('Do not add console.log to items that are inside a function.', () => {
    const code = 'function sayHi(){const hi = "hi"; hi;}';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput('function sayHi(){const hi = "hi"; hi;}')
    );
  });

  test('Add console.log to a mathematical operation.', () => {
    const code = '1+1;';
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput('console.log(1+1);'));
  });

  test('Add console.log to a mathematical operation with a variable.', () => {
    const code = 'const n = 3; 1+n;';
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput('const n = 3; console.log(1+n);'));
  });

  test('Should not add console.log inside an if statement', () => {
    const code = 'if (true) { alert("Hello, world!"); }';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput('if (true) { console.log(alert("Hello, world!")); }')
    );
  });

  test('Replace non-console.log calls with console.log', () => {
    const code = 'someFunction(alert("Hello, world!"));';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput('console.log(someFunction(alert("Hello, world!")));')
    );
  });

  test('Replace non-console.log calls with console.log inside a try-catch block', () => {
    const code =
      'try { alert("Hello, world!"); } catch (e) { console.error(e); }';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(
        'try { console.log(alert("Hello, world!")); } catch (e) { console.error(e); }'
      )
    );
  });

  test('Replace non-console.log calls with console.log inside a while loop', () => {
    const code = 'while (true) { alert("Hello, world!"); }';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput('while (true) { console.log(alert("Hello, world!")); }')
    );
  });

  test('Replace non-console.log calls with console.log inside a for loop', () => {
    const code = 'for (let i = 0; i < 10; i++) { alert("Hello, world!"); }';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(
        'for (let i = 0; i < 10; i++) { console.log(alert("Hello, world!")); }'
      )
    );
  });

  test('Replace non-console.log calls with console.log inside a do-while loop', () => {
    const code = 'do { alert("Hello, world!"); } while (true);';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput('do { console.log(alert("Hello, world!")); } while (true);')
    );
  });
  test('Does not add console.log to an arrow function expression', () => {
    const code = 'const add = (a, b) => a + b;';
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput('const add = (a, b) => a + b;'));
  });

  test('Does not add console.log to a function declaration', () => {
    const code = 'function multiply(a, b) {return a * b;}';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput('function multiply(a, b) {return a * b;}')
    );
  });

  test('Does not add console.log to a variable declarator', () => {
    const code = 'const str = "hello";';
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput('const str = "hello";'));
  });

  test('Add console.log to a ternary expression', () => {
    const code = 'const a = 1; const b = 2; a < b ? a : b;';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput('const a = 1; const b = 2; console.log(a < b ? a : b);')
    );
  });

  test('Doesnt add console.log to a variable declaration with a ternary expression', () => {
    const code = 'const a = 1; const b = 2; const min = a < b ? a : b;';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput('const a = 1; const b = 2; const min = a < b ? a : b;')
    );
  });

  test('Doesnt add console.log to a variable inside a switch statement', () => {
    const code = 'const a = 1; switch(a){}';
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput('const a = 1; switch(a){}'));
  });

  test('Doesnt add console.log to a variable inside a if statement', () => {
    const code = 'const a = 1; if(a){}';
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput('const a = 1; if(a){}'));
  });

  test('Add console.log to a variable inside a case statement', () => {
    const code = 'const a = 1; switch(a){ case 1: a }';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput('const a = 1; switch(a){ case 1: console.log(a); }')
    );
  });

  test('Add console.log to a multiple mathematical operations', () => {
    const code = '2+2/2*4-5';
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput('console.log(2+2/2*4-5);'));
  });

  test('Doesnt add console.log to a binary expression in a if statement', () => {
    const code = 'const a = 1; if(a===2){a}';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput('const a = 1; if(a===2){console.log(a);}')
    );
  });

  test('Add console.log to a binary expression outside a statement', () => {
    const code = '1 === 2';
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput('console.log(1===2);'));
  });

  test('Add console.log to a logical expression outside a statement', () => {
    const code = 'const a = 0; a || 2';
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput('const a = 0; console.log(a||2);'));
  });

  test('Doesnt add console.log to a logical combination expression inside a if statement', () => {
    const code = 'if(10 === 20 || 20 === 30 && 30 > 0){}';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput('if(10 === 20 || 20 === 30 && 30 > 0){}')
    );
  });

  test('Add console.log to a logical combination expression outside a if statement', () => {
    const code = '10 === 20 || 20 === 30 && 30 > 0';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput('console.log(10 === 20 || 20 === 30 && 30 > 0);')
    );
  });

  test('Doesnt add console.log to a logical combination expression inside a while loop', () => {
    const code = 'while(10>20){}';
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput('while(10>20){}'));
  });

  test('Add console.log to a update operator', () => {
    const code = 'let a = 0; a++';
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput('let a = 0;console.log(a++);'));
  });

  test('Add console.log to a update operator inside a loop', () => {
    const code =
      'for (let i = 0; i < 10; i++) { console.log(alert("Hello, world!")); i++; }';
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(
        'for (let i = 0; i < 10; i++) { console.log(alert("Hello, world!")); console.log(i++); }'
      )
    );
  });

  test('Doesnt add console.log to logical expressions on the argument of a loop', () => {
    const code = `for (let i = 0; i < 10 || 20; i++) {}
      while(10>20 || 23 && 23){}
      do{}while(10>20 || 23 && 23);`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(`for (let i = 0; i < 10 || 20; i++) {}
      while(10>20 || 23 && 23){}
      do{}while(10>20 || 23 && 23);`)
    );
  });

  test('Doesnt add console.log to logical expressions on the argument of a conditional', () => {
    const code = `const a = 20; if(1 || 2 && 3 || a){}else if(1 || 2 && 3 || a){}`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(
        `const a = 20; if(1 || 2 && 3 || a){}else if(1 || 2 && 3 || a){}`
      )
    );
  });

  test('Add console.log to a member expression', () => {
    const code = `const string = "Hello"; string[0]; const number = 2; string[number]; string[0][2]`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(
        `const string = "Hello"; console.log(string[0]); const number = 2; console.log(string[number]); console.log(string[0][2]);`
      )
    );
  });

  test('Add console.log to a unary expression', () => {
    const code = `![2,3,4][0];`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput(`console.log(![2, 3, 4][0]);`));
  });

  test('Add console.log to logical assigment (OR & AND)', () => {
    const code = `const a = { duration: 50, title: '' };a.duration ??= 10 ? 20 : 20; a.duration ||= 10 ? 20 : 20;`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(
        `const a = { duration: 50, title: '' };console.log(a.duration ??= 10 ? 20 : 20); console.log(a.duration ||= 10 ? 20 : 20);`
      )
    );
  });

  test('Doesnt add console.log to a assigment inside a for attribute', () => {
    const code = `for (let i = 0; i < 10 || 20 || 230 && 213; i+=20) { console.log(alert("Hello, world!")); console.log(i++); };`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(
        `for (let i = 0; i < 10 || 20 || 230 && 213; i+=20) { console.log(alert("Hello, world!")); console.log(i++); };`
      )
    );
  });

  test('Doesnt add console.log to a ternary condition inside a for attribute', () => {
    const code = `for (let i = 0; 0 ? 0 : 0 && 213; i+=20) { console.log(alert("Hello, world!")); console.log(i++); };`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(
        `for (let i = 0; 0 ? 0 : 0 && 213; i+=20) { console.log(alert("Hello, world!")); console.log(i++); };`
      )
    );
  });

  test('Doesnt add console.log to a OR & AND condition inside a for attribute', () => {
    const code = `for (let i = 0; 0 || 0 && 0 && 213; i+=20) { console.log(alert("Hello, world!")); console.log(i++); };`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(
        `for (let i = 0; 0 || 0 && 0 && 213; i+=20) { console.log(alert("Hello, world!")); console.log(i++); };`
      )
    );
  });

  test('Doesnt add console.log to a update operator inside a while loop', () => {
    const code = `let a = 0; while(a+=2){} while(a++){}`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(`let a = 0; while(a+=2){} while(a++){}`)
    );
  });

  test('Doesnt add console.log to a update operator inside a if', () => {
    const code = `let a = 0; if(a++){}`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput(`let a = 0; if(a++){}`));
  });

  test('Add console.log to a await operator', () => {
    const code = `await test();`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput(`console.log(await test());`));
  });

  test('Doesnt add console.log to a member expression inside a if statement', () => {
    const code = `const message = "!asd"
    if(message.includes("asd")){}`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(`const message = "!asd";
      if(message.includes("asd")){}`)
    );
  });

  test('Doesnt add console.log to unaryExp inside a if statement', () => {
    const code = `const message = "!asd"
    if(!message.includes("asd")){}`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(`const message = "!asd";
      if(!message.includes("asd")){}`)
    );
  });

  test('Doesnt add console.log to unaryExp inside a if statement', () => {
    const code = `const message = "!asd"
    if(message.includes){}`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(`const message = "!asd";
      if(message.includes){}`)
    );
  });

  test('Doesnt add console.log to switch case', () => {
    const code = `switch(true){ case 1==1: break; case 2==2: break; default: break; }`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(
        `switch(true){ case 1==1: break; case 2==2: break; default: break; }`
      )
    );
  });

  test('Doesnt add console.log to forof', () => {
    const code = `for (const el of json){console.log(el)};`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(`for (const el of json) {console.log(el);};`)
    );
  });

  test('Doesnt add console.log to forin', () => {
    const code = `for (const el in json) {console.log(el);};`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(`for (const el in json){console.log(el);};`)
    );
  });

  test('Doesnt add console.log to forof', () => {
    const code = `for (const el of Object.keys(json)){console.log(el)};`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(`for (const el of Object.keys(json)) {console.log(el);};`)
    );
  });

  test('Doesnt add console.log to forin', () => {
    const code = `for (const el in Object.keys(json)) {console.log(el);};`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(`for (const el in Object.keys(json)){console.log(el);};`)
    );
  });

  test('Should add console.log to a New keyword expression', () => {
    const code = `new Date()`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput(`console.log(new Date());`));
  });

  test('Should add console.log to a rest operator in a array', () => {
    const code = `[1,2,...test]`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput(`[1,2,...test];`));
  });

  test('Should not add console.log to a labeled stmt', () => {
    const code = `const test = 0; {a: test}`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(clearInput(`const test = 0; {a: test;}`));
  });

  test('Should not add console.log inside a class', () => {
    const code = `
    class Test {
      constructor (name) {
          this.name = name;
      }
  
      greet () {
        console.log("Hello I am a cat, and my name is " + this.name);
      }
    }
    class Developer extends Test {
      constructor (name) {
          super(name);
      }
  
      writeCode (coffe) {
          console.log(coffe);
      }
    }`;
    const transformed = autoConsole(code);
    expect(transformed).toBe(
      clearInput(`class Test {
        constructor (name) {
            this.name = name;
        }
    
        greet () {
          console.log("Hello I am a cat, and my name is " + this.name);
        }
      }
      class Developer extends Test {
        constructor (name) {
            super(name);
        }
    
        writeCode (coffe) {
            console.log(coffe);
        }
      }`)
    );
  });
});
