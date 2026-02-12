Feature: View Product Details

  Scenario: Product details show name, description, price, image, and add to cart
    Given I open the tool shop page
    When I open the first product
    Then I see product details with name description price and image
    And the add to cart button is enabled

  Scenario: Out of stock product cannot be added to cart
    Given I open the tool shop page
    When I open an out of stock product
    Then the add to cart button is disabled
