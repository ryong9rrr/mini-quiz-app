const path = require("path");

module.exports = function override(config) {
  /* eslint-disable no-param-reassign */
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      "~": path.resolve(__dirname, "src"),
    },
  };
  return config;
};
