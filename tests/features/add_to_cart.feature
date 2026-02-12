Feature: Add Product to Cart

  Scenario: Logged in user can add a product to cart
    Given I am logged in as a customer
    And I open the tool shop page
    When I add the first product to the cart
    Then the cart quantity should increase
    And the cart should list the added product

  Scenario: Out of stock product cannot be added to cart
    Given I am logged in as a customer
    And I open the tool shop page
    When I open an out of stock product
    Then the add to cart button is disabled
