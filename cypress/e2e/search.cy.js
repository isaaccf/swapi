describe('Search', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/?search=luke', { fixture: 'people/lukeSearchResults.json' })
    cy.intercept('GET', '**/?search=l', { fixture: 'people/lSearchResults.json' })
  })

  it('should have 1 record', () => {
    cy.visit('/search?term=luke')
    cy.wait(500)
    cy.get('[class*=itemList]').its('length').should('eq', 1)
  })

  it('should have Show more button', () => {
    cy.visit('/search?term=l')
    cy.wait(500)
    cy.get('[class*=itemList]').its('length').should('eq', 10)
    cy.get('[class=loadMore]').its('length').should('eq', 1)
  })

  it('should have 20 records', () => {
    cy.get('[class=loadMore]').click()
    cy.wait(500)
    cy.get('[class*=itemList]').its('length').should('eq', 20)
  })
  
})