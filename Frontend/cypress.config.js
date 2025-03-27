import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Replace with your app's URL
    specPattern: 'cypress/e2e/authentication/SignInPage.cy.js', // Path to test files
    supportFile: false, // Set to false if no support file exists
  },
});
