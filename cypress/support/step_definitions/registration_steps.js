import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the home page", () => {
    cy.visit("/");
});

When("I enter a new username {string} and password {string}", (username, password) => {
    cy.get("#username").type(username);
    cy.get("#password").type(password);
});

When("I enter an existing username {string} and password {string}", (username, password) => {
    cy.get("#username").type(username);
    cy.get("#password").type(password);
});

When("I click the register button", () => {
    cy.get('button[name="action"][value="register"]').click();
});

Then("I should see a success message {string}", (message) => {
    cy.on("window:alert", (text) => {
        expect(text).to.contains(message);
    });
});

Then("I should see an error message {string}", (message) => {
    cy.on("window:alert", (text) => {
        expect(text).to.contains(message);
    });
});