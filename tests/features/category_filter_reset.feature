Feature: Category Filtering and Reset

  Scenario: Filter persists and pagination keeps results
    Given I open the tool shop page
    When I filter by the first category
    Then the filtered results should match the selected category
    And the category filter should persist after refresh
    And pagination should keep the category filter applied

  Scenario: Clear filters restores the full list
    Given I open the tool shop page
    And I remember the first product name
    When I filter by the first category
    And I clear the category filter
    Then I should see the original first product again
