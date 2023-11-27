import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: './build/babel-plugin-auto-console-log.js',
    plugins: [typescript({ sourceMap: false })],
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
  },
  {
    input: './build/constants/index.js',
    plugins: [typescript({ sourceMap: false })],
    output: [
      {
        format: 'es',
        file: './dist/constants/index.js'
      },
      {
        format: 'cjs',
        file: './dist/constants/index.cjs'
      }
    ]
  }
];
