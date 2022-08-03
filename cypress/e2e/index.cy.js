describe('Index', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/people**', { fixture: 'people/page1.json' })
    cy.visit('/');
  })

  it('should load the page', () => {
    cy.get('h1').contains('Star Wars API')
  });
  
})