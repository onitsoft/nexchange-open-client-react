import config from '../../src/config';

describe('Deposit amount is changed when user changes received amount at exchange order.', function() {

  it('Received input changes deposit input value on order page', function() {
    cy.server();

    cy.visit('http://localhost:3000/?pair=XLMXRP');

    cy.wait(4000)

    const deposit_orig = cy.get('#coin-input-deposit').invoke('val')

    cy.get('#coin-input-receive').type('100');

    cy.wait(2000)

    const deposit = cy.get('#coin-input-deposit').invoke('val')

    expect(deposit).to.not.equal(deposit_orig)
  });

  it('Deposit input changes received input value on order page', function() {
    cy.server();

    cy.visit('http://localhost:3000/?pair=XLMXRP');

    cy.wait(4000)

    const receive_orig = cy.get('#coin-input-receive').invoke('val')

    cy.get('#coin-input-deposit').type('100');

    cy.wait(2000)

    const receive = cy.get('#coin-input-receive').invoke('val')

    expect(receive).to.not.equal(receive_orig)
  });

});