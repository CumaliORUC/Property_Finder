class PlpPage {
    getAvailableFrom() {
        return cy.get("div.property-page__column > div.property-page__column--left > div.panel.panel--style1.panel--style3 > ul > li:nth-child(5) > div.property-facts__value");
    }
}
export default PlpPage











