Feature: Login

  Scenario: Valid credentials allow login
    Given I am on the login page
    When I log in with valid credentials
    Then I should see my account page

  Scenario: Invalid credentials show an error
    Given I am on the login page
    When I log in with invalid credentials
    Then I should see a login error message
