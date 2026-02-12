Feature: View Order History

  Scenario: Logged in user can view order history and details
    Given I am logged in as a customer
    When I open my order history
    Then I should see a list of orders
    And I can open the first order details

  Scenario: Order history requires login
    When I open order history directly
    Then I should be prompted to log in
