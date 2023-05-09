Feature: testing out the various parts of the signup page
  Scenario: open the page and enter a valid email and password
    Given I am on the signup page
    When I enter "test@email.com"
    And I enter "Password1!" in both fields
    And I press the submit button
    Then I should see "successfully registered" in the page
  Scenario: open the page and enter an invalid email
    Given I am on the signup page
    When I enter "fakeemail"
    And I enter "Password1!" in both fields
    And I press the submit button
    Then I should see "Please enter a valid email" in the page
  Scenario: open the page and enter nothing
    Given I am on the signup page
    And I press the submit button
    Then I should see "Field cannot be empty" in the page
  Scenario: open the page and enter a valid email, mismatched passwords
    Given I am on the signup page
    When I enter "test@email.com"
    And I enter "Password1!" in first field
    And I enter "nomatch" in the second field
    And I press the submit button
    Then I should see "Please ensure passwords match" in the page
  Scenario: open the page and enter a valid email, invalid passwords
    Given I am on the signup page
    When I enter "test@email.com"
    And I enter "bad" in first field
    And I enter "bad" in the second field
    And I press the submit button
    Then I should see "Please ensure you enter a valid password" in the page
    
