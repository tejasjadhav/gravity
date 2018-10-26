const path = require('path');

function buildConfig(env, argv) {
  const isDevMode = argv.mode !== 'production';

  const config = {
    entry: path.join(__dirname, '/src/index.ts'),
    output: {
      filename: 'gravity.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
  };

  return config;
}

module.exports = buildConfig;
