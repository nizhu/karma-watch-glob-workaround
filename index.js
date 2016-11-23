var glob = require('glob');

module.exports = function(patterns) {
  return patterns.map(function (pattern) {
    return glob.sync(pattern);
  }).reduce(function (flat, entry) {
    return flat.concat(entry);
  }, [])
}
