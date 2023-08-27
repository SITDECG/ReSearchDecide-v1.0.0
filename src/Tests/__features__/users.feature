
Feature: User Management

  Scenario: Save new user to the database
    Given the user is not authenticated
    When a new user with email "danielo14ch@hotmail.com" and password "password123" signs up with username "Efrain"
    Then the user should be saved to the database

  Scenario: User sends verification email
    Given the user is authenticated
    When the user sends a verification email
    Then a verification email should be sent to the user

  Scenario: Retrieve user by email
    Given the user is authenticated
    When I search for a user with email "danielo14ch@hotmail.com"
    Then the user details should be returned

  Scenario: Retrieve user by UID
    Given the user is authenticated
    When I search for a user with UID "123456"
    Then the user details should be returned

  Scenario: Retrieve user by display name
    Given the user is authenticated
    When I search for a user with display name "Efrain"
    Then the user details should be returned

  Scenario: Retrieve user list
    Given the user is authenticated
    When I retrieve the list of users
    Then the list of users should be returned

  Scenario: User sign up
    Given the user provides the following details:
      | email                   | password    | userName |
      | danielo14ch@hotmail.com | password123 | Efrain   |
    When the user signs up
    Then the user should be registered successfully

  Scenario: User log in
    Given the user provides the following credentials:
      | email                   | password    |
      | danielo14ch@hotmail.com | password123 |
    When the user logs in
    Then the user should be logged in successfully

  Scenario: User signs out
    Given the user is authenticated
    When the user signs out
    Then the user should be logged out successfully

  Scenario: User reloads their information
    Given the user is authenticated
    When the user reloads their information
    Then the user information should be reloaded

  Scenario: User reauthentication
    Given the user is authenticated
    When the user reauthenticates with email "danielo14ch@hotmail.com" and password "password123"
    Then the user should be reauthenticated successfully

  Scenario: User updates password
    Given the user is authenticated
    When the user updates their password to "newpassword123"
    Then the password should be updated successfully

  Scenario: User sends password reset email
    Given the user provides their email "danielo14ch@hotmail.com"
    When the user sends a password reset email
    Then a password reset email should be sent