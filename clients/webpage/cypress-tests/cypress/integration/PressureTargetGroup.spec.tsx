describe('Make Pressure with target group', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  Cypress._.times(1, () => {
    it('Fill pressure form', () => {
      cy.get('.css-tkm1e4 > .css-1818pao').eq(0)
        .select('Recife');
      cy.get('[name ="email"]').eq(1)
        .should('be.visible').type('email@exemplo.com');
      cy.get('[name="name"]').eq(1)
        .should('be.visible').type('Nome');
      cy.get('[name ="lastname"]').eq(1)
        .should('be.visible').type('Sobrenome');

      //send email button
      cy.get('#widget-70818 > .css-1iyoj2o > .css-709yn1 > .css-khpahi > .css-1ki7tk3')
        .should('be.visible')
        .click();

      //confirmation
      cy.get('.css-aomufq > img')
        .should('be.visible');
    });
  });
});
