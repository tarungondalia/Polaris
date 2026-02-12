Feature: Update or Remove from Cart

  Scenario: Updating quantity updates totals
    Given I am logged in as a customer
    And I have a product in my cart
    When I increase the cart quantity to 2
    Then the cart line total should update

  Scenario: Removing an item empties the cart
    Given I am logged in as a customer
    And I have a product in my cart
    When I remove the product from the cart
    Then the cart should be empty
