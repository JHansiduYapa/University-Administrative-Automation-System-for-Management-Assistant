describe('SignIn Page Test', () => {
  it('Should log in successfully with valid credentials', () => {
    // Visit the login page
    cy.visit('/SignInPage'); // Relative to baseUrl

    // Interact with form fields using placeholders
    cy.get('input[placeholder="Enter your email"]').type('admin@example.com'); // Select email input by placeholder
    cy.get('input[placeholder="Enter your password"]').type('23'); // Select password input by placeholder

    // Submit the form
    cy.get('button').contains('Sign In').click(); // Select button by text

    // Assert successful login (e.g., redirected to dashboard)
    cy.url({ timeout: 10000 }).should('include', '/ma-page'); // Adjust path based on actual redirect URL

    // Assert that the page contains "Welcome to Faculty Of Engineering University Of Jaffna"
    cy.contains('Welcome to Faculty Of Engineering University Of Jaffna').should('be.visible');
  });

  it('Should show an error message for invalid credentials', () => {
    cy.visit('/SignInPage');

    cy.get('input[placeholder="Enter your email"]').type('wronguser@example.com');
    cy.get('input[placeholder="Enter your password"]').type('wrongpassword');

    cy.get('button').contains('Sign In').click();

    // Assert error message is displayed
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Invalid email or password');
    });
  });
});
