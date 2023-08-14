Feature: Real-time Topic Scores

  Scenario: Getting the topics with max and min scores
    Given a user wants to monitor topic scores
    When the user subscribes to real-time topic score updates
    And the topics have scores: 
      | id      | score |
      | topic1  | 10    |
      | topic2  | 5     |
      | topic3  | 15    |
    Then the user should receive updates with topics having max and min scores:
      | id      | score |
      | topic3  | 15    |
      | topic2  | 5     |

  Scenario: No topics available
    Given a user wants to monitor topic scores
    When the user subscribes to real-time topic score updates
    And there are no topics available
    Then the user should not receive any updates

