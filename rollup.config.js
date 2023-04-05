import { writeFile, mkdir } from 'node:fs/promises';
import del from 'rollup-plugin-delete';

function createCommonJsPackage() {
  const pkg = { type: 'commonjs' };
  return {
    name: 'babel-plugin-auto-console-log',
    buildEnd: async () => {
      await mkdir('./dist/cjs', { recursive: true });
      await writeFile('./dist/cjs/package.json', JSON.stringify(pkg, null, 2));
    }
  };
}

export default [
  {
    input: './src/esm/babel-plugin-auto-console-log.js',
    plugins: [del({ targets: 'dist/*' }), createCommonJsPackage()],
    output: [
      { format: 'es', file: './dist/esm/babel-plugin-auto-console-log.js' },
      { format: 'cjs', file: './dist/cjs/babel-plugin-auto-console-log.js' }
    ]
  }
];
