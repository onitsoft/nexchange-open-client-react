import orderFiat from '../../src/__mocks__/orderFiat';
import orderCrypto from '../../src/__mocks__/orderCrypto';

describe('Order creation', function() {
  it('creates DOGEEUR (fiat) order and gets redirected to order page', function() {
    cy.server();
    cy.route({
      method: 'POST',
      url: 'orders',
      response: orderFiat,
    });

    cy.route({
      method: 'GET',
      url: 'orders/*',
      response: orderFiat,
    });

    cy.visit('http://localhost:3000?pair=BTCETH');

    cy.wait(3000)

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
  });

  it('creates DOGEBTC (crypto) order and gets redirected to order page', function() {
    cy.server();
    cy.route({
      method: 'POST',
      url: 'orders',
      response: orderCrypto,
    });

    cy.route({
      method: 'GET',
      url: 'orders/*',
      response: orderCrypto,
    });

    cy.visit('http://localhost:3000?pair=BTCETH');

    cy.get('.selectedCoin-deposit').click();
    cy.get('.coin-currency-dropdown')
      .contains('BTC')
      .click();

    cy.get('.selectedCoin-receive').click();
    cy.get('.coin-currency-dropdown')
      .contains('DOGE')
      .click();

    cy.get('#withdraw-addr').type('DAMiAKGvZkuUti1kneKP3jMSmLs3jDeY91');

    cy.get('.proceed').click();
  });
});
