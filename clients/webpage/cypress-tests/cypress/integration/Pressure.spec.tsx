describe('Make Pressure', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  Cypress._.times(1, (i) => {
    it('Fill pressure form', () => {
      //fill fields
      cy.get('#widget-70817 > .css-1iyoj2o > .css-709yn1 > .css-1oqlxvr > :nth-child(2) > .css-x87rhw').eq(0).
        should('be.visible').type('email@exemplo.com');
      cy.get('[name="name"]').eq(0)
        .should('be.visible').type('Nome');
      cy.get('[name ="lastname"]').eq(0)
        .should('be.visible').type('Sobrenome');
      cy.get('[name ="state"]').eq(0)
        .should('be.visible').select('MG');
      cy.get('[name ="city"]').eq(0)
        .should('be.visible').type('Cidade');

      //send email button
      cy.get('#widget-70817 > .css-1iyoj2o > .css-709yn1 > .css-khpahi > .css-1ki7tk3').eq(0)
        .should('be.visible')
        .click();

      //confirmation
      cy.get('.css-aomufq > img')
        .should('be.visible');
    });
  });

  it('incomplete fill form without name', () => {
    cy.get('#widget-70817 > .css-1iyoj2o > .css-709yn1 > .css-1oqlxvr > :nth-child(2) > .css-x87rhw').eq(0).should('be.visible')
      .type('email@exemplo.com');
    cy.get('[name ="lastname"]').eq(0)
      .should('be.visible').type('Sobrenome');
    cy.get('[name ="state"]').eq(0)
      .should('be.visible').select('MG');
    cy.get('[name ="city"]').eq(0)
      .should('be.visible').type('Cidade');
    cy.get('#widget-70817 > .css-1iyoj2o > .css-709yn1 > .css-khpahi > .css-1ki7tk3').eq(0)
      .should('be.visible')
      .click();

    //required field
    cy.get('.css-1klseg4').eq(0)
      .should('be.visible');
  });
});
