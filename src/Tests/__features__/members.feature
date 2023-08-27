Feature: Members

  Scenario: Getting a member with valid userId and id
    Given a member with userId "validUserId" and id "validId"
    When the function getMemberByUserId is called
    Then the result should be a Member object

  Scenario: Getting a member with invalid userId
    Given a member with userId "invalidUserId" and id "validId"
    When the function getMemberByUserId is called
    Then the result should be null

  Scenario: Getting a member with invalid id
    Given a member with userId "validUserId" and id "invalidId"
    When the function getMemberByUserId is called
    Then the result should be null

  Scenario: Updating member's vote with valid uid and id
    Given a member with uid "validUid" and id "validId"
    When the function updateMemberVote is called with new vote true
    Then the member's vote should be updated to true

  Scenario: Updating member's vote with invalid uid
    Given a member with uid "invalidUid" and id "validId"
    When the function updateMemberVote is called with new vote false
    Then the member's vote should not be updated

  Scenario: Updating member's vote with invalid id
    Given a member with uid "validUid" and id "invalidId"
    When the function updateMemberVote is called with new vote true
    Then the member's vote should not be updated