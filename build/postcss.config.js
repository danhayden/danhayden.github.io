module.exports = {
  use: [
    'autoprefixer',
    'cssnano'
  ],
  autoprefixer: {
    browsers: '> 1%, not Explorer < 11',
    flexbox: false
  },
  cssnano: {
    'discardComments': {
      'removeAll': true
    }
  }
};
