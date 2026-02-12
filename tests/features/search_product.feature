Feature: Search for a Product

  Scenario: Search returns matching products
    Given I open the tool shop page
    When I search for the first product name
    Then I should see search results for that product

  Scenario: Search with no matches shows message
    Given I open the tool shop page
    When I search for "no-such-product-xyz"
    Then I should see a no results message
