Feature: Topics 

  Scenario: Getting topics when topics are available
    Given there are topics available
    When the function getTopics is called
    Then it should return a list of topics

  Scenario: Getting a list of topic scores ordered by score ascending
    Given there are topic scores available
    When the function getTopicsScore is called
    Then it should return a list of topic scores ordered by score ascending

  Scenario: Getting topics when no topics are available
    Given there are no topics available
    When the function getTopics is called
    Then it should return an empty list
    
  Scenario: Updating the score of an existing topic
    Given there is a topic with title "Topic 1" and score 10
    When the function updateTopicScoreByTopic is called with title "Topic 1" and new score 5
    Then the score of the topic "Topic 1" should be updated to 15

  Scenario: Updating boolean properties of an existing topic
    Given there is a topic with title "Topic 1" and properties attractive=true, novel=false
    When the function updateBooleanProperties is called with title "Topic 1" and properties to update attractive=false, trend=true
    Then the properties attractive and novel of the topic "Topic 1" should be updated to false and true, respectively

  Scenario: Clicking on a research topic should redirect to Google Scholar
    Given a user is viewing a research topic "Topic 1"
    When the user clicks on the research topic
    Then the user should be redirected to Google Scholar with the search query "Topic 1"

  Scenario: Clicking on multiple research topics should redirect to Google Scholar
    Given a user is viewing the research topics "Topic 1", "Topic 2", and "Topic 3"
    When the user selects the research topics "Topic 1" and "Topic 3"
    And the user clicks on the selected research topics
    Then the user should be redirected to Google Scholar with the search queries "Topic 1" and "Topic 3"

Feature: Drag and Drop Research Topics

  Scenario: User can reorder research topics using drag and drop
    Given a user is on the research topics ranking page
    When the user arranges the research topics in the desired order
    And the user saves the new order
    Then the research topics should be reordered as per user's preference
