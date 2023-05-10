const { defineConfig } = require("cypress");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
   
}

module.exports = defineConfig({

  env: {
    url: 'https://rahulshettyacademy.com',    
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/examples/*.js'
  },
});
