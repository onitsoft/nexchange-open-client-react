import config from '../../src/config';

describe('XLM-XRP memo is emptied at coin switch', function() {

  it('creates XLMXRP order after coin switch and gets redirected to order page', function() {
    cy.server();

    cy.visit('http://localhost:3000/?pair=XLMXRP');

    cy.wait(3000)

    cy.get('#withdraw-addr-memo').type('123456');

    cy.get('#coin-switch').click();

    cy.get('#withdraw-addr').type('rPrMs7KmbxcybK2bJy2kPiRK8Rjye4HNJo');

    cy.get('.proceed').click();
  });

    it('creates XLMXRP order after coin switch and gets redirected to order page - dest tag filled', function() {
    cy.server();

    cy.visit('http://localhost:3000/?pair=XLMXRP');

    cy.wait(3000)

    cy.get('#withdraw-addr-memo').type('123456');

    cy.get('#coin-switch').click();

    cy.get('#withdraw-addr').type('rPrMs7KmbxcybK2bJy2kPiRK8Rjye4HNJo');

    cy.get('#withdraw-addr-desttag').type('123456');

    cy.get('.proceed').click();
  });
});

describe('XRP-XLM dest tag is emptied at coin switch', function() {

  it('creates XRPXLM order after coin switch and gets redirected to order page', function() {
    cy.server();

    cy.visit('http://localhost:3000/?pair=XRPXLM');

    cy.wait(3000)

    cy.get('#withdraw-addr-desttag').type('123456');

    cy.get('#coin-switch').click();

    cy.get('#withdraw-addr').type('GCJFFZJ645AWY4ZZMAB455C2H4IND7YQUQITUFWP7J7DOCSOSEUBBY64');

    cy.get('.proceed').click();
  });

  it('creates XRPXLM order after coin switch and gets redirected to order page', function() {
    cy.server();

    cy.visit('http://localhost:3000/?pair=XRPXLM');

    cy.wait(3000)

    cy.get('#withdraw-addr-desttag').type('123456');

    cy.get('#coin-switch').click();

    cy.get('#withdraw-addr').type('GCJFFZJ645AWY4ZZMAB455C2H4IND7YQUQITUFWP7J7DOCSOSEUBBY64');

    cy.get('#withdraw-addr-memo').type('123456');

    cy.get('.proceed').click();
  });

});