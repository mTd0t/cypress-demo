Feature: User Registration

  Scenario: Successful registration with new credentials
    Given I am on the login page
    When I enter a new username "newuser" and password "newpass123"
    And I click the register button
    Then I should see a success message "Registration Successful!"

  Scenario: Failed registration with existing username
    Given I am on the login page
    When I enter an existing username "admin" and password "admin123"
    And I click the register button
    Then I should see an error message "Username already exists."