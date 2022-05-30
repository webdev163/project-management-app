const autoprefixer = require('autoprefixer');

const pluginsList = [];

if (process.env.NODE_ENV === 'production') {
  pluginsList.push(
    autoprefixer({
      cascade: false,
    }),
  );
}

module.exports = {
  plugins: pluginsList,
};
