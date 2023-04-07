import del from 'rollup-plugin-delete';

export default [
  {
    input: './src/babel-plugin-auto-console-log.js',
    plugins: [del({ targets: 'dist/*' })],
    output: [
      { format: 'es', file: './dist/babel-plugin-auto-console-log.js' },
      { format: 'cjs', file: './dist/babel-plugin-auto-console-log.cjs' }
    ]
  }
];
