Feature: View Product List

  Scenario: Products display with names, images, prices, and links
    Given I open the tool shop page
    Then I see products with names, images, prices, and links

  Scenario: Pagination works for product list
    Given I open the tool shop page
    When I navigate to the next product page
    Then I should see a different set of products

  Scenario: Previous pagination is disabled on first page
    Given I open the tool shop page
    Then the previous pagination control is disabled