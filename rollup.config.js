import copy from 'rollup-plugin-copy';

import { writeFile, mkdir } from 'fs/promises';

function createCommonJsPackage() {
  const pkg = { type: 'commonjs' };
  return {
    name: 'auto-console',
    buildEnd: async () => {
      await mkdir('./dist/cjs', { recursive: true });
      await writeFile('./dist/cjs/package.json', JSON.stringify(pkg, null, 2));
    }
  };
}

export default [
  {
    input: './src/esm/auto-console.js',
    plugins: [
      copy({
        targets: [{ src: './package.json', dest: 'dist' }]
      }),
      createCommonJsPackage()
    ],
    output: [
      { format: 'es', file: './dist/esm/auto-console.js' },
      { format: 'cjs', file: './dist/cjs/auto-console.js' }
    ]
  }
];
