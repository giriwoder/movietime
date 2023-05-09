Feature: testing out the user list page
  Scenario: open page and enter a movie search and then click the submit button
    Given I on the user list page right now
    When I click on the add list button
    And I press enter into my text field "Shrek"
    Then I should see a pop up that says "Shrek"
