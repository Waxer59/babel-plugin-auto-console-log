const autoConsole = function autoConsole(babel) {
  const { types: t } = babel;
  return {
    visitor: {
      CallExpression(path) {
        const { node } = path;

        if (node.callee.object?.name === 'console') {
          path.skip();
          return;
        }
        path.replaceWith(
          t.callExpression(
            t.memberExpression(t.identifier('console'), t.identifier('log')),
            [path.node]
          )
        );
      },
      Identifier(path) {
        const { node } = path;
        if (
          t.isSwitchStatement(path.parent) ||
          t.isLoop(path.parentPath.parent) ||
          t.isIfStatement(path.parent)
        ) {
          path.skip();
          return;
        }
        if (path.scope.hasBinding(node.name) && path.isReferencedIdentifier()) {
          path.replaceWith(
            t.callExpression(
              t.memberExpression(t.identifier('console'), t.identifier('log')),
              [path.node]
            )
          );
        }
      },
      BinaryExpression(path) {
        if (
          t.isConditionalExpression(path.parentPath) ||
          t.isLoop(path.parentPath) ||
          t.isConditional(path.parent)
        ) {
          path.skip();
          return;
        }
        path.replaceWith(
          t.callExpression(
            t.memberExpression(t.identifier('console'), t.identifier('log')),
            [path.node]
          )
        );
      },
      ArrowFunctionExpression(path) {
        path.skip();
      },
      FunctionDeclaration(path) {
        path.skip();
      },
      VariableDeclarator(path) {
        path.skip();
      },
      ExpressionStatement(path) {
        if (
          t.isConditional(path.parentPath.parent) &&
          !t.isBlockStatement(path.parent)
        ) {
          path.skip();
        }
      },
      LogicalExpression(path) {
        path.replaceWith(
          t.callExpression(
            t.memberExpression(t.identifier('console'), t.identifier('log')),
            [path.node]
          )
        );
      },
      ConditionalExpression(path) {
        path.replaceWith(
          t.callExpression(
            t.memberExpression(t.identifier('console'), t.identifier('log')),
            [path.node]
          )
        );
      }
    }
  };
};

module.exports = autoConsole;
