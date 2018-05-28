import orderFiat from '../../src/__mocks__/orderFiat';
import orderCrypto from '../../src/__mocks__/orderCrypto';

describe('Order creation', function() {
  it('creates XVGEUR (fiat) order and gets redirected to order page', function() {
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

    cy.visit('http://localhost:3000');

    cy
      .get('.selectedCoin-deposit')
      .find('i.fa-angle-down')
      .click();

    cy
      .get('.coin-currency-dropdown')
      .contains('EUR')
      .click();

    cy
      .get('.selectedCoin-receive')
      .find('i.fa-angle-down')
      .click();

    cy
      .get('.coin-currency-dropdown')
      .contains('XVG')
      .click();

    cy.get('.proceed').click();
    cy.get('#withdraw-addr').type('DLCw22a8B8Roetqp2t2q7zop8SYZp9wY5E');

    cy.get('.proceed').click();
  });

  it('creates XVGBTC (crypto) order and gets redirected to order page', function() {
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

    cy.visit('http://localhost:3000');

    cy
      .get('.selectedCoin-deposit')
      .find('i.fa-angle-down')
      .click();
    cy
      .get('.coin-currency-dropdown')
      .contains('BTC')
      .click();

    cy
      .get('.selectedCoin-receive')
      .find('i.fa-angle-down')
      .click();
    cy
      .get('.coin-currency-dropdown')
      .contains('XVG')
      .click();

    cy.get('.proceed').click();
    cy.get('#withdraw-addr').type('DLCw22a8B8Roetqp2t2q7zop8SYZp9wY5E');

    cy.get('.proceed').click();
  });
});
