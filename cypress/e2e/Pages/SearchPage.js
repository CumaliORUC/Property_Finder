class SearchPage {
    getPriceFilterDropdown() {
        return cy.get("[data-testid='filters-form-dropdown-price']");
    }

    getMaxPriceDropdown(){
        return cy.get("[data-testid='filters-form-range-dropdown-to-input']");
    }

    getPriceDropdownElements(){
        return cy.get('[data-testid="dropdown-content"] button');
    }

    getResultCount(){
        return cy.get('c');
    }

    getFindButton(){
        return cy.get("[data-testid='filters-form-btn-find']");
    }

    getLocationSearchField(){
        return cy.get("div.filter-form-component-variant__row.filter-form-component-variant__row-3 > button.multi-selection-autocomplete__root > div > input");
    }

    getLocationSuggestion(){
        return cy.get("div.multi-selection-autocomplete__dropdown");
    }
    getPropertyLinks(){
        return cy.get("div[class*='view_desktop_column--primary'] > ul > li > article > a");
    }
}
export default SearchPage














