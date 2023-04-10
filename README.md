# Auto console log 🚀

babel-plugin-auto-console-log is a Babel plugin that automatically adds console.log() statements to your JavaScript code. This library is useful for debugging code, as it adds console.log() statements to specific parts of the code so that you can see the values of variables and the results of operations.

The main goal of babel-plugin-auto-console-log is to make code debugging easier and faster by automatically adding console.log() statements to your code. This means that you won't have to manually add console.log() statements to your code every time you need to debug it, which saves time and reduces errors.

# Install

```bash
npm i babel-plugin-auto-console-log --save-dev

or

yarn add babel-plugin-auto-console-log -D 

or

pnpm i babel-plugin-auto-console-log --dev
```

# How to use 📝

Auto Console Log is a Babel transform that can be used both on the client-side and server-side of a JavaScript project.

Here is an example on how you can implement it using the `@babel/standalone` package:

1. Install both packages:
```bash
npm i @babel/standalone babel-plugin-auto-console-log --save-dev
```

2. Register the plugin and create a function to transform your code:
```javascript
import Babel from '@babel/standalone';
import autoConsoleLog from 'babel-plugin-auto-console-log';
// const autoConsoleLog = require("babel-plugin-auto-console-log")

Babel.registerPlugin('babel-plugin-auto-console-log', autoConsoleLog());
```

3. Create a function to transform your code:
```javascript
const transform = (source) =>
    Babel.transform(source, {
      plugins: ['babel-plugin-auto-console-log']
    }).code;
```

4. You are now ready to transform your code! using the `transform()` function.

### Here is the complete code:

```javascript
import Babel from '@babel/standalone';
import autoConsoleLog from 'babel-plugin-auto-console-log';
// const autoConsoleLog = require("babel-plugin-auto-console-log")

Babel.registerPlugin('babel-plugin-auto-console-log', autoConsoleLog());

const transform = (source) =>
    Babel.transform(source, {
      plugins: ['babel-plugin-auto-console-log']
    }).code;
```

## Options

* `consoleMethod` ***default: log*** : The **consoleMethod** parameter is used to specify the logging method to be used to print the output of a function. For example, if "warn" is provided as the value for the **consoleMethod** parameter, the output will be printed with the "< consoleObject >.warn" method instead of the default console.log method.

* `consoleObject` ***default: console*** : The **consoleObject** parameter is an argument that can be provided to a function and its purpose is to specify the console object that will be used to print the output of the function. For example if "logger" is the given value the output will be "logger.< consoleMethod >".

## Constants

### CONSOLE_METHODS 

**CONSOLE_METHODS** gives you a list of all the methods that console has, so that you don't make a mistake when using a method other than "log".

To use this constant you must import it from **"babel-plugin-auto-console-log/constants"** as follows: 

```javascript
import { CONSOLE_METHODS } from "babel-plugin-auto-console-log/constants"

// or 

const { CONSOLE_METHODS } = require("babel-plugin-auto-console-log/constants")
```

# Examples

Here are some examples of how the babel-plugin-auto-console-log plugin works:

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

***

## Input

```javascript
function sayHi (name) {
    return `Hello ${name}!!!`
}

sayHi("foo");
```

## Output

```javascript
function sayHi (name) {
    return `Hello ${name}!!!`
}

console.log(sayHi("foo"));
```

# Contributing 🤝

Thank you for your interest in contributing to babel-plugin-auto-console-log! We appreciate your support and welcome any contributions to this project.

To get started, please refer to the [CONTRIBUTING.md](./CONTRIBUTING.md) file for guidelines on how to contribute to this project.

Once again, thank you for your interest in contributing to babel-plugin-auto-console-log!
