/// <reference types="cypress" />

import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps"
import SearchPage from "../Pages/SearchPage";
import HomePage from "../Pages/HomePage";
import PlpPage from "../Pages/PlpPage";

const homePage = new HomePage();
const searchPage = new SearchPage();
const plpPage = new PlpPage


// Given User goes to "home" page
Given(`User goes to {string} page`, page => {
    cy.viewport(1400, 660);
    switch (page) {
      case "home":
        cy.visit('/')
        break;

      default:
        break;
    }
  });

// When User selects "Villa" as Property Type filter on property "home" page
// When User selects "Office Space" as Property Type filter on property "home" page
When("User selects {string} as Property Type filter on property {string} page", (filter, page) => {
    switch (page) {
        case 'home':
            homePage.getPropertyTypeFilter().click()
            homePage.getPropertyTypeFilterElements().contains(filter).click();
            break;

        case 'search':
            break;
    
        default:
            break;
    }
});

// And User clicks on the property "home" page "search" button
// And User clicks on the property "home" page "show commercial properties only" button
// And User clicks on the property "home" page "rent" button
And("User clicks on the property {string} page {string} button", (page, btn) => {
    switch (btn) {
        case 'search':
            switch (page) {
                case 'home':
                    homePage.getSearchButton().click()
                    break;
            
                case 'search':
                    
                    break;
                default:
                    break;
            }
            break;
        case 'find':
            switch (page) {
                case 'home':                    
                    break;
            
                case 'search':
                    cy.intercept({
                        method: 'GET',
                        url: '**/search.json?**'
                    }).as('searchRequest');
                    
                    searchPage.getFindButton().click()
                    break;
                default:
                    break;
            }
            break;
        case 'show commercial properties only':
            homePage.getShowCommercialPropertiesOnlyButton().click()
            break;
        case 'rent':
            homePage.getRentButton().click()
            break;
        default:
            break;
    }
});

// When User selects "300,000" as Property Price Max filter on property "search" page
When("User selects {string} as Property Price Max filter on property {string} page", (filter, page) => {
    switch (page) {
        case 'home':
            break;

        case 'search':
            searchPage.getPriceFilterDropdown().click()
            searchPage.getMaxPriceDropdown().click()
            //searchPage.getMaxPriceDropdown().scrollIntoView().click()
            searchPage.getPriceDropdownElements().contains(filter).click()
            cy.wait(1000);
            cy.scrollTo('top');
            cy.wait(1000);
            cy.get('[data-testid=\'filters-form-dropdown-price\']').scrollIntoView().click({force: true});
            cy.wait(1000);
            break;
        default:
            break;
            }
});

// Then User verify the total number of results from the API
Then("User verify the total number of results from the API", () => {
    cy.wait(2000);
    cy.get('span[aria-label="Search results count"]').invoke('text').then((domText) => {
        const domCount = parseInt(domText.replace(' properties', '').replace(',', ''));
        cy.wait('@searchRequest').then(interception => {
            expect(interception.response.body.pageProps.searchResult.meta.total_count).to.eq(domCount);
        });
      });
});

// Then User verify the details of the first property in the searched result from the API
Then("User verify the details of the first property in the searched result from the API", () => {
    cy.wait(2000);
    cy.request('https://www.propertyfinder.bh/en/api/property?page[number]=1&sort=-featured&filter[category_id]=3&fields[propety]=name').then((response) => {
        // https://www.propertyfinder.bh/_next/data/gIML7QLRua-VY67sDO2TX/en/search.json?c=3&t=4&fu=0&rp=m&ob=mr
    expect(response.status).to.equal(200);
    const firstProperty = response.body.data[0];
    cy.get("[data-testid='property-card-price']").first().invoke('text').then((text) => {
        const actualNumber = parseInt(text.replace(/,/g, '').replace(' BHDExclusive', '').trim());
        expect(actualNumber).to.equal(firstProperty.attributes.default_price);
    });
    // cy.get("[data-testid='property-card-price']").first().should('have.text', firstProperty.attributes.default_price);
    cy.get("h2[class*='styles-module_content__title']").first().should('have.text', firstProperty.attributes.name);
    cy.get("p[class*='styles-module_content__location']").first().should('have.text', firstProperty.attributes.location_tree_path);
    cy.get("[data-testid='property-card-spec-area']").first().invoke('text').then((text) => {
        const trimmedText = text.trim();
        expect(trimmedText).to.equal(firstProperty.attributes.area);
    });
    cy.get("[data-testid='property-card-spec-bathroom']").first().invoke('text').then((text) => {
        const trimmedText = parseInt(text.trim());
        expect(trimmedText).to.equal(firstProperty.attributes.bathroom_value);
    });
  });
});

// When User searches for location "Bahrain Bay" on property "home" page
When('User searches for location {string} on property {string} page', (location, page) => {
    switch (page) {
        case 'search':
            break;
        case 'home':
            searchPage.getLocationSearchField().type(location)
            cy.wait(5000)
            searchPage.getLocationSuggestion().click()
            break;
        default:
            break;
    }
});

// And User selects the first property from the list
And('User selects the first property from the list', () => {
    searchPage.getPropertyLinks().first().click()
});

// Then User verify the "Available from date" should not be empty
Then('User verify the {string} should not be empty', (availableFromDate) => {
    plpPage.getAvailableFrom().should('not.be.empty')
});