describe('Form', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  Cypress._.times(1, () => {
    it('fill form', () => {
      cy.get(':nth-child(1) > .input')
        .should('be.visible').type('Nome');
      cy.get(':nth-child(2) > .input')
        .should('be.visible').type('email@exemplo.com');
      cy.get(':nth-child(3) > .input').type('81999999999')
      cy.get('.select')
        .should('be.visible').select("Alagoas");

      //send button
      cy.get('.css-1nf0hlf')
        .should('be.visible')
        .click();

      //confirmation
      cy.get('.css-aomufq > img')
        .should('be.visible');
    });
  });

  it('fill form without name ', () => {
    cy.get(':nth-child(2) > .input').should('be.visible')
      .type('email@exemplo.com');
    cy.get('.select')
      .should('be.visible').select("Pernambuco");

    //send button
    cy.get('.css-1nf0hlf')
      .should('be.visible')
      .click();

    //require field
    cy.get('.css-60k78l > p')
      .should('be.visible');
  });
});
