Feature: User Login

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid username "admin" and password "admin123"
    And I click the login button
    Then I should see a success message
    When I click the "Go to Task Manager" button
    Then I should be redirected to the dashboard

  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I enter invalid username "wronguser" and password "wrongpass"
    And I click the login button
    Then I should see an error message
    When I click the "Try Again" button
    Then The popup should close