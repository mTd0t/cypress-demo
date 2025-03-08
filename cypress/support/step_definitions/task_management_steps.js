import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Step: Log in as a specific user
Given("I am logged in as {string}", (username) => {
    // Mock a logged-in user by setting localStorage
    const user = { username: username, name: username, password: `${username}123` };
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Visit the dashboard
    cy.visit('/dashboard.html');
});

// Step: Add a new task
When("I add a new task {string}", (taskText) => {
    cy.get("#taskInput").type(taskText); // Enter the task text
    cy.get("#taskForm").submit(); // Submit the form to add the task
});

// Step: Click the textbox
When("I click the textbox", () => {
    cy.get("#taskInput").click(); // Corrected selector
});

// Step: Type text into the textbox
When("I type {string}", (text) => {
    cy.get("#taskInput").type(text); // Added step for typing text
});

// Step: Click a button with specific text
When("I click the button {string}", (buttonText) => {
    cy.get("button").contains(buttonText).click(); // Added step for clicking a button
});

// Step: Verify the task is in the active tasks list
Then("I should see the task {string} in the active tasks list", (taskText) => {
    cy.get("#activeTaskList").should("contain", taskText); // Check if the task is in the active tasks list
});

// Step: Ensure an active task exists
Given("I have an active task {string}", (taskText) => {
    // Add the task directly to localStorage for the current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.username}`)) || [];
    tasks.push({ text: taskText, completed: false }); // Add the task as active
    localStorage.setItem(`tasks_${currentUser.username}`, JSON.stringify(tasks));

    // Refresh the page to reflect the changes
    cy.visit('/dashboard.html');
});

// Step: Edit a task
When("I edit an existing task to {string}", (newTaskText) => {
    // Find the task to edit and click the "Edit" button
    cy.get("#activeTaskList")
        .contains("li", "Buy groceries") // Find the task by its text
        .within(() => {
            cy.get('button').contains("Edit").click(); // Click the "Edit" button
        });

    // Wait for the input field to appear, then clear and type the new task text
    cy.get("#activeTaskList")
        .find('input') // Find the input field (which replaces the task text)
        .should("be.visible") // Ensure the input field is visible
        .clear() // Clear the existing text
        .type(newTaskText); // Type the new task text

    // Click the "Save" button
    cy.get("#activeTaskList")
        .find('button').contains("Save") // Find the "Save" button
        .click();
});

// Step: Mark a task as done
When("I mark the task {string} as done", (taskText) => {
    cy.get("#activeTaskList")
        .contains("li", taskText) // Find the task in the active tasks list
        .within(() => {
            cy.get('button').contains("Done").click(); // Click the "Done" button
        });
});

// Step: Verify the task is in the finished tasks list
Then("I should see the task {string} in the finished tasks list", (taskText) => {
    cy.get("#finishedTaskList").should("contain", taskText); // Check if the task is in the finished tasks list
});

// Step: Delete a task
When("I delete the task {string}", (taskText) => {
    cy.get("#activeTaskList")
        .contains("li", taskText) // Find the task in the active tasks list
        .within(() => {
            cy.get('button').contains("Delete").click(); // Click the "Delete" button
        });
    // Wait for the SweetAlert2 popup to appear
    cy.get(".swal2-popup", { timeout: 5000 }).should("be.visible"); // Wait up to 5 seconds for the popup to appear

    // Confirm the deletion in the SweetAlert2 popup
    cy.get(".swal2-confirm").click();
});

When("I delete the finished task {string}", (taskText) => {
    cy.get("#finishedTaskList")
        .contains("li", taskText) // Find the task in the active tasks list
        .within(() => {
            cy.get('button').contains("Delete").click(); // Click the "Delete" button
        });
    // Wait for the SweetAlert2 popup to appear
    cy.get(".swal2-popup", { timeout: 5000 }).should("be.visible"); // Wait up to 5 seconds for the popup to appear

    // Confirm the deletion in the SweetAlert2 popup
    cy.get(".swal2-confirm").click();
});

// Step: Verify the task is not in the active tasks list
Then("I should not see the task {string} in the active tasks list", (taskText) => {
    cy.get("#activeTaskList").should("not.contain", taskText); // Check if the task is not in the active tasks list
});

// Step: Verify the task is not in the finished tasks list
Then("I should not see the task {string} in the finished tasks list", (taskText) => {
    cy.get("#finishedTaskList").should("not.contain", taskText); // Added step for verifying absence in finished tasks
});