Feature: User Login

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid username "admin" and password "admin123"
    And I click the login button
    Then I should see a success message
    And I should click the "Go to Task Manager" button
    And I should be redirected to the dashboard
    Then I click the Logout button
    When I enter valid username "user" and password "user123"
    And I click the login button
    Then I should see a success message
    And I should click the "Go to Task Manager" button
    And I should be redirected to the dashboard

  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I enter invalid username "wronguser" and password "wrongpass"
    And I click the login button
    Then I should see an error message
    And I should click the "Try Again" button
    Then The popup should close
    When I enter invalid username "wronwdvfgeruser" and password "wrongpesrgvass"
    And I click the login button
    Then I should see an error message
    And I should click the "Try Again" button
    Then The popup should close
    When I enter invalid username "w123135ser" and password "wron98632gpass"
    And I click the login button
    Then I should see an error message
    And I should click the "Try Again" button
    Then The popup should close