const { config } = require('@swc/core/spack');

module.exports = config({
  entry: {
    web: __dirname + '/src/exercise/03.tsx',
  },
  output: {
    path: __dirname + '/lib',
  },
  module: {},
});
