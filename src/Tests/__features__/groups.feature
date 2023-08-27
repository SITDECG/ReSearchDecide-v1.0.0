Feature: Group Management

  Scenario: Saving a new group
    Given a user is logged in
    When the user saves a new group with name "Test Group" and description "This is a test group"
    Then the group should be successfully saved with the provided details
    And the user should be added as an admin member to the group

  Scenario: Adding a member to a group
    Given a user is logged in
    And a group exists with name "Test Group" and description "This is a test group"
    When the user adds a new member with email "newmember@example.com" and role "member" to the group
    Then the member should be successfully added to the group
    And the member's details should match the provided information

  Scenario: Getting groups for a user
    Given a user is logged in
    And the user is a member of groups "Group A", "Group B", and "Group C"
    When the user fetches their groups
    Then the user should receive a list of groups they are a member of
    And the group details should match the information in the database

  Scenario: Getting members of a group
    Given a user is logged in
    And a group exists with name "Test Group" and description "This is a test group"
    And the group has members with roles "admin", "member", and "member"
    When the user fetches the members of the group
    Then the user should receive a list of members in the group
    And the member details should match the information in the database

  Scenario: Updating a member's role
    Given a user is logged in
    And a group exists with name "Test Group" and description "This is a test group"
    And the group has a member with email "member@example.com" and role "member"
    When the user updates the role of the member with email "member@example.com" to "admin"
    Then the member's role should be successfully updated to "admin"

  Scenario: Deleting a group
    Given a user is logged in
    And a group exists with name "Test Group" and description "This is a test group"
    When the user deletes the group
    Then the group should be successfully deleted from the database
    And all associated members should also be deleted

  Scenario: Getting a group by ID
    Given a user is logged in
    And a group exists with name "Test Group" and description "This is a test group"
    When the user fetches the group by ID
    Then the user should receive the group details
    And the group details should match the information in the database

  Scenario: Updating a group's details
    Given a user is logged in
    And a group exists with name "Test Group" and description "This is a test group"
    When the user updates the group's name to "Updated Group" and description to "This is an updated test group"
    Then the group's details should be successfully updated in the database
