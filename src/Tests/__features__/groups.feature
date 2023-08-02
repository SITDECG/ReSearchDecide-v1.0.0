Feature: Group Functionality

  Scenario: Create a new group
    Given I am logged in
    When I create a new group with name "Test Group" and description "Test Group Description"
    Then the group should be created successfully

  Scenario: Delete a group
    Given I am logged in
    And I have a group with name "Test Group"
    When I delete the group with name "Test Group"
    Then the group should be deleted successfully
