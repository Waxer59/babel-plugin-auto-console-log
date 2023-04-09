import del from 'rollup-plugin-delete';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: './src/build/babel-plugin-auto-console-log.js',
    plugins: [del({ targets: 'dist/*' }), typescript({ sourceMap: false })],
    output: [
      {
        format: 'es',
        file: './dist/babel-plugin-auto-console-log.js'
      },
      {
        format: 'cjs',
        file: './dist/babel-plugin-auto-console-log.cjs'
      }
    ]
  }
];
