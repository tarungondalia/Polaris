Feature: Complete Checkout

  Scenario: User completes checkout with valid details
    Given I am logged in as a customer
    And I have a product in my cart
    When I complete checkout with valid address and payment
    Then I should see an order confirmation

  Scenario: Payment step requires required fields
    Given I am logged in as a customer
    And I have a product in my cart
    When I proceed to the payment step
    Then the finish button should be disabled
