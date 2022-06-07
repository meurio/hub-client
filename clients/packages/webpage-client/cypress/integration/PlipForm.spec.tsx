describe('Submit Plip Form', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  Cypress._.times(1, () => {
    it('Fill plip form', () => {
      cy.get('form > :nth-child(2) > input')
        .should('be.visible').type('Nome');
      cy.get('form > :nth-child(3) > input')
        .should('be.visible').type('email@exemplo.com');
      cy.get('form > :nth-child(4) > select')
        .should('be.visible').select('PE')
      cy.get('form > :nth-child(5) > input')
        .should('be.visible').type('81999999999')
      cy.get(':nth-child(6) > select')
        .should('be.visible').select('20')

      //send plip button
      cy.get('form > button')
        .should('be.visible')
        .click();

      //download signature form
      cy.get('.css-161qoga > a')
        .should('be.visible').click();
    });

    it('Fill plip form without name', () => {
      cy.get('form > :nth-child(3) > input')
        .should('be.visible').type('email@exemplo.com');
      cy.get('form > :nth-child(4) > select')
        .should('be.visible').select('PE')
      cy.get('form > :nth-child(5) > input')
        .should('be.visible').type('81999999999')
      cy.get(':nth-child(6) > select')
        .should('be.visible').select('20')

      //send plip button
      cy.get('form > button')
        .should('be.visible')
        .click();

      //error confirmation
      cy.get('form > :nth-child(2) > span')
        .should('be.visible');
    });

    it('Fill plip form without selecting the number of subscriptions', () => {
      cy.get('form > :nth-child(2) > input')
        .should('be.visible').type('Nome');
      cy.get('form > :nth-child(3) > input')
        .should('be.visible').type('email@exemplo.com');
      cy.get('form > :nth-child(4) > select')
        .should('be.visible').select('PE')
      cy.get('form > :nth-child(5) > input')
        .should('be.visible').type('81999999999')

      //send plip button
      cy.get('form > button')
        .should('be.visible')
        .click();

      //error confirmation
      cy.get('form > :nth-child(6) > span')
        .should('be.visible')
    });
  });
});
