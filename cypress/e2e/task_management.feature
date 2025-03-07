Feature: Task Management

  Scenario: Add a new task
    Given I am logged in as "admin"
    When I add a new task "Buy groceries"
    Then I should see the task "Buy groceries" in the active tasks list
    When I add a new task "Random Stuff"
    Then I should see the task "Random Stuff" in the active tasks list

  Scenario: Edit a task
    Given I am logged in as "admin"
    And I have an active task "Buy groceries"
    When I edit an existing task to "Buy groceries and go to a carwash"
    Then I should see the task "Buy groceries and go to a carwash" in the active tasks list

  Scenario: Mark a task as done
    Given I am logged in as "admin"
    And I have an active task "Buy groceries and go to a carwash"
    When I mark the task "Buy groceries and go to a carwash" as done
    Then I should see the task "Buy groceries and go to a carwash" in the finished tasks list

    Scenario: Delete a task
      Given I am logged in as "admin"
      And I have an active task "Random Stuff"
      When I delete the task "Random Stuff"
      Then I should not see the task "Random Stuff" in the active tasks list