Feature: Group Management

  Scenario: Save new group to the database
    Given the user is authenticated
    When a new group with name "My Group" and description "This is my group" is saved
    Then the group should be saved to the database with the correct details

  Scenario: Add a member to an existing group
    Given the user is authenticated
    And there exists a group with ID "group123" in the database
    When a new member with email "user@example.com" and role "member" is added to the group with ID "group123"
    Then the member should be added to the group with the correct details

  Scenario: Get groups by user
    Given the user is authenticated
    And there are groups in the database
    And the user is a member of some groups
    When the user's groups are retrieved
    Then the correct groups should be returned

  Scenario: Get group members
    Given the user is authenticated
    And there exists a group with ID "group123" in the database
    And there are members in the group with ID "group123"
    When the members of the group with ID "group123" are retrieved
    Then the correct members should be returned

  Scenario: Delete group by ID
    Given the user is authenticated
    And there exists a group with ID "group123" in the database
    When the group with ID "group123" is deleted
    Then the group should be removed from the database

  Scenario: Delete member by ID
    Given the user is authenticated
    And there exists a group with ID "group123" in the database
    And there is a member with ID "member456" in the group with ID "group123"
    When the member with ID "member456" is deleted
    Then the member should be removed from the group with ID "group123"

  Scenario: Update member role
    Given the user is authenticated
    And there exists a group with ID "group123" in the database
    And there is a member with ID "member456" in the group with ID "group123"
    When the role of the member with ID "member456" in the group with ID "group123" is updated to "admin"
    Then the member's role should be updated correctly