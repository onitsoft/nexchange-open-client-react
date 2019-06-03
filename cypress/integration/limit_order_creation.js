import limitOrder from '../../src/__mocks__/limitorder';
import config from '../../src/config';

describe('Limit Order creation', function() {
  if(config.ADVANCED_MODE_ENABLED) {
    it('creates DOGEBTC limit order and gets redirected to order page', function() {
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

      cy.visit('http://localhost:3000?advanced&pair=DOGEETH');

      cy.wait(3000)

      cy.get('.selectedCoin-receive').click();

      cy.get('.coin-currency-dropdown')
        .contains('BTC')
        .click();

      cy.get('#withdraw-addr').type('DAMiAKGvZkuUti1kneKP3jMSmLs3jDeY91');

      cy.get('.proceed').click();
    });
  }
});
