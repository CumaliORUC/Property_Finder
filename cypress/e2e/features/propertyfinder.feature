Feature: As a User, I make sure the Property Finder website work as expected

Scenario: Check the total displayed number of results for category Villas with a price range of less than 300,000 AED / yearly
    Given User goes to "home" page
    When User selects "Villa" as Property Type filter on property "home" page
    And User clicks on the property "home" page "search" button
    When User selects "300,000" as Property Price Max filter on property "search" page
    And User clicks on the property "search" page "find" button
    Then User verify the total number of results from the API

Scenario: Click on the commercial properties only checkbox and select "offices"
    Given User goes to "home" page
    And User clicks on the property "home" page "show commercial properties only" button
    When User selects "Office Space" as Property Type filter on property "home" page
    And User clicks on the property "home" page "search" button
    And User clicks on the property "search" page "find" button
    Then User verify the total number of results from the API
    Then User verify the details of the first property in the searched result from the API

Scenario: Search for property by location
    Given User goes to "home" page
    And User clicks on the property "home" page "rent" button
    When User searches for location "Bahrain Bay" on property "home" page
    And User clicks on the property "home" page "search" button
    And User selects the first property from the list
    Then User verify the "Available from date" should not be empty





