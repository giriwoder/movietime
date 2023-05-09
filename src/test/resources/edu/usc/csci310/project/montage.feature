Feature: testing out the various parts of the Montage page
  Scenario: Can access montage page
    Given I am on the user list page with all movies
    When I press the montage button
    Then I should see a montage in the page
