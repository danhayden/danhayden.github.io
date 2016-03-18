var readyStateStylesheet = require('ready-state-stylesheet');
var stylesheetUrl = 'https://fonts.googleapis.com/css?family=Montserrat:400,700|Roboto+Slab';

readyStateStylesheet(stylesheetUrl, function () {
  document.body.parentNode.classList.add('fonts-loaded');
});
