const autoConsole = function autoConsole(babel) {
  const { types: t } = babel;
  const replacement = t.memberExpression(
    t.identifier('console'),
    t.identifier('log')
  );
  return {
    visitor: {
      CallExpression(path) {
        const { node } = path;

        if (node.callee.object?.name === 'console') {
          path.skip();
          return;
        }
        path.replaceWith(t.callExpression(replacement, [path.node]));
      },
      Identifier(path) {
        const { node } = path;
        if (
          t.isSwitchStatement(path.parent) ||
          t.isLoop(path.parentPath.parent) ||
          t.isIfStatement(path.parent) ||
          t.isExpression(path.parentPath)
        ) {
          path.skip();
          return;
        }
        if (path.scope.hasBinding(node.name) && path.isReferencedIdentifier()) {
          path.replaceWith(t.callExpression(replacement, [path.node]));
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
        path.replaceWith(t.callExpression(replacement, [path.node]));
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
        if (t.isConditional(path.parent) || t.isLoop(path.parent)) {
          path.skip();
          return;
        }
        path.replaceWith(t.callExpression(replacement, [path.node]));
      },
      ConditionalExpression(path) {
        if (
          t.isConditionalExpression(path.parentPath) ||
          t.isLoop(path.parentPath) ||
          t.isConditional(path.parent)
        ) {
          path.skip();
          return;
        }
        path.replaceWith(t.callExpression(replacement, [path.node]));
      },
      UpdateExpression(path) {
        if (
          t.isConditionalExpression(path.parentPath) ||
          t.isLoop(path.parentPath) ||
          t.isConditional(path.parent)
        ) {
          path.skip();
          return;
        }
        path.replaceWith(t.callExpression(replacement, [path.node]));
      },
      AssignmentExpression(path) {
        if (
          t.isConditionalExpression(path.parentPath) ||
          t.isLoop(path.parentPath) ||
          t.isConditional(path.parent)
        ) {
          path.skip();
          return;
        }
        path.replaceWith(t.callExpression(replacement, [path.node]));
      },
      UnaryExpression(path) {
        path.replaceWith(t.callExpression(replacement, [path.node]));
      },
      MemberExpression(path) {
        path.replaceWith(t.callExpression(replacement, [path.node]));
      }
    }
  };
};

export default autoConsole;
