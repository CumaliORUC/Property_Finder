class HomePage {
    getPropertyTypeFilter() {
        return cy.get("[class*='filter-form-component-variant__row-3'] > div[class*='data-filter-type-filter[propertyTypeId]']");
    }
    getPropertyTypeFilterElements() {
        return cy.get(".filter-single-selection__dropdown-list li.dropdown-list__item");
    }
    getSearchButton() {
        return cy.get('div.filter-form-component-variant__row.filter-form-component-variant__row-3 > button.button-2.button-primary.filter-form-search-button.filter-form-component-variant__sm-hide');
    }
    getShowCommercialPropertiesOnlyButton() {
        return cy.get(".checkbox-component__box");
    }
    getRentButton() {
        return cy.get("div.filter-form-component-variant__category-selector > label:nth-child(2)");
    }
}
export default HomePage












