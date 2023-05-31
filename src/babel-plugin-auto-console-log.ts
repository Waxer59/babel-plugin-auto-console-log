import { PluginObj } from '@babel/core';
import { IOptions } from './interfaces/options.interface';
import * as types from '@babel/types';

const DEFAULT_OPTIONS: IOptions = {
  consoleMethod: 'log',
  consoleObject: 'console'
};

const autoConsole = function autoConsole(options = DEFAULT_OPTIONS) {
  return ({ types: t }: { types: typeof types }): PluginObj => {
    const replacement = t.memberExpression(
      t.identifier(options.consoleObject),
      t.identifier(options.consoleMethod)
    );
    return {
      name: 'auto-console-log',
      visitor: {
        CallExpression(path: any) {
          const { node, parent } = path;
          if (node.callee.object?.name === options.consoleObject || t.isIfStatement(parent)) {
            path.skip();
            return;
          }
          path.replaceWith(t.callExpression(replacement, [node]));
        },
        Identifier(path: any) {
          const { node, parent, parentPath } = path;
          if (
            t.isSwitchStatement(parent) ||
            t.isLoop(parentPath.parent) ||
            t.isIfStatement(parent) ||
            t.isExpression(parentPath)
          ) {
            path.skip();
            return;
          }
          if (
            path.scope.hasBinding(node.name) &&
            path.isReferencedIdentifier()
          ) {
            path.replaceWith(t.callExpression(replacement, [node]));
          }
        },
        BinaryExpression(path: any) {
          const { node, parent, parentPath } = path;
          if (
            t.isConditionalExpression(parentPath) ||
            t.isLoop(parentPath) ||
            t.isConditional(parent)
          ) {
            path.skip();
            return;
          }
          path.replaceWith(t.callExpression(replacement, [node]));
        },
        ArrowFunctionExpression(path: any) {
          path.skip();
        },
        FunctionDeclaration(path: any) {
          path.skip();
        },
        VariableDeclarator(path: any) {
          path.skip();
        },
        ExpressionStatement(path: any) {
          const { parent, parentPath } = path;
          if (
            t.isConditional(parentPath.parent) &&
            !t.isBlockStatement(parent)
          ) {
            path.skip();
          }
        },
        LogicalExpression(path: any) {
          const { node, parent } = path;
          if (t.isConditional(parent) || t.isLoop(parent)) {
            path.skip();
            return;
          }
          path.replaceWith(t.callExpression(replacement, [node]));
        },
        ConditionalExpression(path: any) {
          const { node, parent, parentPath } = path;
          if (
            t.isConditionalExpression(parentPath) ||
            t.isLoop(parentPath) ||
            t.isConditional(parent)
          ) {
            path.skip();
            return;
          }
          path.replaceWith(t.callExpression(replacement, [node]));
        },
        UpdateExpression(path: any) {
          const { node, parent, parentPath } = path;
          if (
            t.isConditionalExpression(parentPath) ||
            t.isLoop(parentPath) ||
            t.isConditional(parent)
          ) {
            path.skip();
            return;
          }
          path.replaceWith(t.callExpression(replacement, [node]));
        },
        AssignmentExpression(path: any) {
          const { node, parent, parentPath } = path;
          if (
            t.isConditionalExpression(parentPath) ||
            t.isLoop(parentPath) ||
            t.isConditional(parent)
          ) {
            path.skip();
            return;
          }
          path.replaceWith(t.callExpression(replacement, [node]));
        },
        UnaryExpression(path: any) {
          const { node, parent } = path;
          if( t.isIfStatement(parent)){
            path.skip();
            return;
          }
          path.replaceWith(t.callExpression(replacement, [node]));
        },
        MemberExpression(path: any) {
          const { node, parent } = path;
          if( t.isIfStatement(parent)){
            path.skip();
            return;
          }
          path.replaceWith(t.callExpression(replacement, [node]));
        },
        AwaitExpression(path: any) {
          const { node } = path;
          path.replaceWith(t.callExpression(replacement, [node]));
        }
      }
    };
  };
};

export default autoConsole;
