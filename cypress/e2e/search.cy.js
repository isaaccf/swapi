describe('Search', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/?search=luke', { fixture: 'people/lukeSearchResults.json' })
    cy.visit('/search?term=luke')
    cy.wait(500)
  })

  it('should have 1 record', () => {
    cy.get('[class*=itemList]').its('length').should('eq', 1)
  })
  
})