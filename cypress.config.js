const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugin/index')(on, config)
    },
    specPattern:'cypress/e2e/features',
    baseUrl: "https://www.propertyfinder.bh",
    defaultCommandTimeout: 15000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    excludeSpecPattern: ['*.js', '*.md']
  },
  reporter: "../node_modules/mochawesome/src/mochawesome.js",
  reporterOptions: {
      "overwrite": false,
      "html": false,
      "json": true
  }
});
