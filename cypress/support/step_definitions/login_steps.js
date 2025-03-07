import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the login page", () => {
    cy.visit("/"); // Uses the base URL defined in cypress.config.js
});

When("I enter valid username {string} and password {string}", (username, password) => {
    cy.get("#username").clear();
    cy.get("#password").clear();
    cy.get("#username").type(username);
    cy.get("#password").type(password);
});

When("I enter invalid username {string} and password {string}", (username, password) => {
    cy.get("#username").clear();
    cy.get("#password").clear();
    cy.get("#username").type(username);
    cy.get("#password").type(password);
});

When("I click the login button", () => {
    cy.get('button[name="action"][value="login"]').click();
});

Then("I should see a success message", () => {
    // Wait for the SweetAlert2 popup to appear
    cy.get(".swal2-popup").should("be.visible");
    cy.get(".swal2-title").should("contain", "Login Successful!");
});

Then('I should click the "Go to Task Manager" button', () => {
    // Click the confirm button in the SweetAlert2 popup
    cy.get(".swal2-confirm").click(); // Use the custom class added to the button
});
Then('I click the Logout button', () => {
    // Click the confirm button in the SweetAlert2 popup
    cy.get("#logoutBtn").click(); // Use the custom class added to the button
});

Then("I should be redirected to the dashboard", () => {
    // Verify the URL has changed to the dashboard
    cy.url().should("include", "/dashboard.html"); // Uses the base URL
});
Then("I should see an error message", () => {
    // Wait for the SweetAlert2 popup to appear
    cy.get(".swal2-popup").should("be.visible");
    cy.get(".swal2-title").should("contain", "Login Failed");
});
Then('I should click the "Try Again" button', () => {
    // Click the confirm button in the SweetAlert2 popup
    cy.get(".swal2-confirm").click(); // Use the custom class added to the button
});
Then("The popup should close", () => {
    // Verify the URL has changed to the dashboard
    cy.location('pathname').should('eq', `/`) // Uses the base URL
});