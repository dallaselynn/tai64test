'use strict';

var _tai = require('./lib/tai64');

const labels = [
  '40000000f487501c', '40000001b09f121c','40000007915fc51c',
  '4000003afff53a9c', '40001ca4f3758a24', '40001ca4f3758a25'
];

labels.forEach(function(label) {
    let t = _tai.TAI64.fromString(label);
    console.log('%s %s', label, t.toMoment().utc().format('YYYY-MM-DD HH:mm:ss'));
});


