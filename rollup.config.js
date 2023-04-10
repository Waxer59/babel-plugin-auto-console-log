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
    input: './build/constants/constants.js',
    plugins: [typescript({ sourceMap: false })],
    output: [
      {
        format: 'es',
        file: './dist/constants/constants.js'
      },
      {
        format: 'cjs',
        file: './dist/constants/constants.cjs'
      }
    ]
  }
];
