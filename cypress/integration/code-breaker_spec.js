describe('Codebreaker test', () => {
  const secret = '1234';

  it('Test with rigth secret results XXXX', () => {
    cy.visit('/');

    cy.request(`http://localhost:3001/set-secret?secret=${secret}`)
      .its('body.result')
      .should('eq', secret);

    cy.get('#code-input').type(secret).should('have.value', secret);

    cy.get('#test-code-btn').click();

    cy.get('#code-result').should('contain', 'Resultado: XXXX');
  });

  it('Test with wrong secret results XX', () => {
    const testValue = '1256';

    cy.get('#code-input')
      .clear()
      .type(testValue)
      .should('have.value', testValue);

    cy.get('#test-code-btn').click();

    cy.get('#code-result').should('contain', 'Resultado: XX');
  });

  it('Test with right secret wrong order results ____', () => {
    const testValue = '3412';

    cy.get('#code-input')
      .clear()
      .type(testValue)
      .should('have.value', testValue);

    cy.get('#test-code-btn').click();

    cy.get('#code-result').should('contain', 'Resultado: ____');
  });

  it('Test with wrong secret results empty string', () => {
    const testValue = '5678';

    cy.get('#code-input')
      .clear()
      .type(testValue)
      .should('have.value', testValue);

    cy.get('#test-code-btn').click();

    cy.get('#code-result').should('contain', 'Resultado: ');
  });
});
