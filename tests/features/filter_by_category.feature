Feature: Filter Products by Category

  Scenario: Selecting a category updates the product list
    Given I open the tool shop page
    And I remember the first product name
    When I filter by the first category
    Then the filtered results should match the selected category

  Scenario: Clearing the category filter restores products
    Given I open the tool shop page
    And I remember the first product name
    When I filter by the first category
    And I clear the category filter
    Then I should see the original first product again
