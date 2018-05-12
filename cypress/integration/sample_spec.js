import orderMock from '../../src/__tests__/__mocks__/order';

describe('My First Test', function() {
  it('Visits the Kitchen Sink', function() {
    cy.server();
    cy.route({
      method: 'POST',      // Route all GET requests
      url: 'orders2', // 'https://api.nexchange.io/en/api/v1/orders/',    // that have a URL that matches '/users/*'
      response: orderMock        // and force the response to be: []
    });

    cy.visit('http://localhost:3000');

    cy.get('.selectedCoin-deposit').find('i.fa-angle-down').click();
    cy.get('.coin-currency-dropdown').contains('EUR').click();

    cy.get('.selectedCoin-receive').find('i.fa-angle-down').click();
    cy.get('.coin-currency-dropdown').contains('XVG').click();

    cy.get('.proceed').click();
    cy.get('#withdraw-addr').type('DLCw22a8B8Roetqp2t2q7zop8SYZp9wY5E');

    cy.get('.proceed').click();
  })
})