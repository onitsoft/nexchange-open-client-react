import limitOrder from '../../src/__mocks__/limitorder';
import config from '../../src/config';

describe('Limit Order creation', function() {
  if(config.ADVANCED_MODE_ENABLED) {
    it('Creates XRPXLM limit order and gets redirected to order page', function() {
      cy.server();
      cy.route({
        method: 'POST',
        url: 'orders',
        response: limitOrder,
      });

      cy.route({
        method: 'GET',
        url: 'orders/*',
        response: limitOrder,
      });

      cy.visit('http://localhost:3000?advanced&pair=BTCXLM');

      cy.wait(4000)

      cy.get('.selectedCoin-receive').click();

      cy.get('.coin-currency-dropdown')
        .contains('XRP')
        .click();

      cy.get('#withdraw-addr').type('rPrMs7KmbxcybK2bJy2kPiRK8Rjye4HNJo');

      cy.get('.proceed').click();

      cy.wait(4000)

      cy.url().should('include', '/order')
    });
  }
});
