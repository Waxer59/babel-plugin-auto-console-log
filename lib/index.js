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
      }
    }
  };
};

module.exports = autoConsole;
