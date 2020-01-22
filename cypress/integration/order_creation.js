
describe('Order creation', function() {
  it('creates DOGEEUR (fiat) order and gets redirected to order page', function() {
    cy.server();

    cy.visit('http://localhost:3000?pair=BTCETH');

    cy.wait(4000)

    cy.get('.selectedCoin-deposit').click();

    cy.get('.coin-currency-dropdown')
      .contains('EUR')
      .click();

    cy.get('.selectedCoin-receive').click();

    cy.get('.coin-currency-dropdown')
      .contains('DOGE')
      .click();

    cy.get('#withdraw-addr').type('DAMiAKGvZkuUti1kneKP3jMSmLs3jDeY91');

    cy.get('.proceed').click();

    cy.wait(4000)

    cy.url().should('include', '/order')

  });

  it('creates DOGEBTC (crypto) order and gets redirected to order page', function() {
    cy.server();

    cy.visit('http://localhost:3000?pair=BTCETH');

    cy.wait(4000)

    cy.get('.selectedCoin-receive').click();
    cy.get('.coin-currency-dropdown')
      .contains('DOGE')
      .click();

    cy.get('.selectedCoin-deposit').click();
    cy.get('.coin-currency-dropdown')
      .contains('BTC')
      .click();

    cy.get('#withdraw-addr').type('DAMiAKGvZkuUti1kneKP3jMSmLs3jDeY91');

    cy.get('.proceed').click();

    cy.wait(4000)

    cy.url().should('include', '/order')
  });
});
