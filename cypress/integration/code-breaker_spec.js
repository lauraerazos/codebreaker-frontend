describe('Codebreaker test', () => {
  it('Go to main page', () => {
    cy.visit('/');

    const secret = '1234';
    cy.get('#code-input').type(secret).should('have.value', secret);

    cy.get('#test-code-btn').click();

    cy.get('#code-result').should('contain', 'Resultado:');
  });
});
