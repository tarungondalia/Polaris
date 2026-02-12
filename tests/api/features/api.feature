Feature: API Tests

  Scenario: Products API returns a list
    When I request the product list from the API
    Then the API should return products

  Scenario: Product detail API returns required fields
    When I request the first product details from the API
    Then the product details should include name and price

  Scenario: Login API returns an access token
    When I log in via the API with valid credentials
    Then the API should return an access token

  Scenario: Invalid login is rejected
    When I log in via the API with invalid credentials
    Then the API should return an unauthorized error

  Scenario: UI and API product data are consistent
    Given I open the tool shop page
    When I compare the first UI product to the API
    Then the product name and price should match
