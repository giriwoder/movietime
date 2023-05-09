Feature: testing out the various parts of login page
  Scenario: Login fail due to invalid email
    Given I am on the login page
    When I enter "invalid.email" in email field
    And I enter "password" in password field
    And I click the submit button
    Then I should see "Please enter a valid email" in the page
  Scenario: Login fail due to invalid password
    Given I am on the login page
    When I enter "test@test.com" in email field
    And I enter "password" in password field
    And I click the submit button
    Then I should see "This email and password cannot be found." in the page
  Scenario: Enter nothing to email field
    Given I am on the login page
    And I click the submit button
    Then I should see "Email cannot be empty" in the page
  Scenario: Enter nothing to password field
    Given I am on the login page
    And I click the submit button
    Then I should see "Password cannot be empty" in the page