const Babel = require('@babel/standalone');

Babel.registerPlugin(
  'autoConsole',
  require('../dist/babel-plugin-auto-console-log.cjs')
);
const autoConsole = (code) =>
  Babel.transform(code, {
    plugins: ['autoConsole']
  })
    .code.replace(/(\r\n|\n|\r)/gm, '')
    .replace(/ /g, '');

const srcCode = [
  "const a = 1; console.log(a); console.log('Hola, mundo!'); let b = 2; console.log(a + b);",
  "function suma(a, b) { return a + b; } console.log(suma(2, 3)); let nombre = 'Juan'; console.log(nombre.length); console.log(nombre.toUpperCase());",
  "for (let i = 1; i <= 10; i++) { console.log(i); if (i % 2 === 0) { console.log('es par'); } else { console.log('es impar'); } } let numeros = [1, 2, 3, 4, 5]; console.log(numeros.reduce((acc, curr) => acc + curr, 0)); console.log(numeros.map(num => num * 2));",
  "let x = 10; while (x > 0) { console.log(x); if (x === 5) { console.log('llegamos a 5!'); };} const miObjeto = { nombre: 'Juan', edad: 30, saludar() { console.log('Hola, mi nombre es ' + this.nombre); }, calcularEdad() { return this.edad * 2; } }; console.log(miObjeto.calcularEdad()); console.log(miObjeto.nombre.toLowerCase());",
  "let palabra = 'hola'; console.log(palabra.split('').reverse().join('')); let numeroAleatorio = Math.floor(Math.random() * 10) + 1; console.log(numeroAleatorio); console.log(numeroAleatorio * 2); let numeros = [5, 10, 15, 20]; console.log(numeros.filter(num => num > 10)); console.log(numeros.map(num => num + 1));",
  "const fecha = new Date(); console.log(fecha.getFullYear()); console.log(fecha.getMonth()); console.log(fecha.getDate()); console.log(fecha.getDay()); let cadena1 = 'hola'; let cadena2 = 'mundo'; console.log(`${cadena1} ${cadena2}`); console.log(`${cadena1} ${cadena2}`.length);",
  'let a = 10; let b = 5; console.log(a + b); console.log(a - b); console.log(a * b); console.log(a / b);',
  "let texto = 'esto es un texto'; console.log(texto.charAt(0)); console.log(texto.substring(5, 8)); console.log(texto.indexOf('un')); console.log(texto.replace('texto', 'palabra'));",
  'let numeros = [2, 5, 1, 3, 4]; console.log(numeros.sort()); console.log(numeros.reverse()); console.log(numeros.indexOf(3)); console.log(numeros.includes(6));',
  "let objeto = { nombre: 'Juan', edad: 30, direccion: { calle: 'Av. Siempreviva', numero: 1234 } }; console.log(objeto.nombre); console.log(objeto.edad); console.log(objeto.direccion.calle); console.log(objeto.direccion.numero);",
  'let numeros = [1, 2, 3, 4, 5]; let resultado = 0; for (let i = 0; i < numeros.length; i++) { console.log(resultado+=numeros[i]); } console.log(resultado); let resultado2 = numeros.reduce((acc, curr) => acc + curr, 0); console.log(resultado2); console.log(numeros.map(num => num * 2)); console.log(numeros.filter(num => num > 2));',
  "let miArray = [1, 'hola', true, { nombre: 'Juan' }]; console.log(miArray[0]); console.log(miArray[1]); console.log(miArray[2]); console.log(miArray[3].nombre); let otroArray = [2, 'chau', false]; let concatArray = miArray.concat(otroArray); console.log(concatArray); console.log(concatArray.slice(2, 5)); console.log(concatArray.indexOf(2));",
  'let a = 5; let b = 10; let c = a + b; let d = b - a; let e = a * b; let f = b / a; console.log(c); console.log(d); console.log(e); console.log(f); let g = true; let h = false; console.log(g && h); console.log(g || h); console.log(!g); console.log(!h);',
  "let palabra1 = 'hola'; let palabra2 = 'mundo'; let palabra3 = palabra1 + ' ' + palabra2; console.log(palabra3); console.log(palabra1.toUpperCase()); console.log(palabra2.toLowerCase()); console.log(palabra1.length); console.log(palabra2.charAt(2));",
  "let numeros1 = [1, 2, 3]; let numeros2 = [4, 5, 6]; let numeros3 = [...numeros1, ...numeros2]; console.log(numeros3); console.log(numeros3.splice(2, 3)); console.log(numeros3); let objeto1 = { nombre: 'Juan', edad: 30 }; let objeto2 = { direccion: 'Calle Falsa 123' }; let objeto3 = { ...objeto1, ...objeto2 }; console.log(objeto3); console.log(Object.keys(objeto3)); console.log(Object.values(objeto3));",
  'let numeros = [1, 2, 3, 4, 5]; let resultado = 0; for (let i = 0; i < numeros.length; i++) { console.log(resultado+=numeros[i]); } console.log(resultado); let resultado2 = numeros.reduce((acc, curr) => acc + curr, 0); console.log(resultado2); console.log(numeros.map(num => num * 2)); console.log(numeros.filter(num => num > 2));',
  "let miObjeto = { nombre: 'Juan', edad: 30, saludar() { console.log('Hola, mi nombre es ' + this.nombre); }, calcularEdad() { return this.edad * 2; } }; console.log(miObjeto.nombre); console.log(miObjeto.edad); console.log(miObjeto.calcularEdad());",
  'let x = 0; while (x <= 10) { console.log(x); } let miFuncion = function(param1, param2) { return param1 + param2; }; console.log(miFuncion(2, 3)); let otraFuncion = (param1, param2) => { return param1 * param2; }; console.log(otraFuncion(2, 3));'
];

describe('Real programs', () => {
  srcCode.forEach((el, idx) => {
    test(`Should not transform de code ${idx}`, () => {
      expect(
        autoConsole(el)
          .replace(/(\r\n|\n|\r)/gm, '')
          .replace(/ /g, '')
      ).toBe(el.replace(/(\r\n|\n|\r)/gm, '').replace(/ /g, ''));
    });
  });
});
