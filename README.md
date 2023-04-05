# Auto console log 🚀

auto-console is a Babel plugin that automatically adds console.log() statements to your JavaScript code. This library is useful for debugging code, as it adds console.log() statements to specific parts of the code so that you can see the values of variables and the results of operations.

The main goal of auto-console is to make code debugging easier and faster by automatically adding console.log() statements to your code. This means that you won't have to manually add console.log() statements to your code every time you need to debug it, which saves time and reduces errors.

# Install

```bash
npm i auto-console --save-dev

or

yarn add auto-console -D 

or

pnpm i auto-console --dev
```

# How to use 📝

# Examples

## Input

```javascript
const foo = 42;

foo;
```

## Output

```javascript
const foo = 42;

console.log(foo);
```

***

## Input

```javascript
1 + 1;
```

## Output

```javascript
console.log(1 + 1);
```

***

## Input

```javascript
10 > 5 ? "Yes!" : "No!";
```

## Output

```javascript
console.log(10 > 5 ? "Yes!" : "No!");
```