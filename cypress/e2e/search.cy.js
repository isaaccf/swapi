describe('Search', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/people/?search=luke?page=**', { fixture: 'people/lukeSearchResults.json' }).as('getLukeSearchResults')
    cy.intercept('GET', '**/people/?search=l?page=**', { fixture: 'people/lSearchResults.json' }).as('getLSearchResults')
  })

  it('should have 1 record', () => {
    cy.visit('/search?term=luke')
    cy.wait('@getLukeSearchResults')
    cy.get('[class*=itemList]').its('length').should('eq', 1)
  })

  it('should have Show more button', () => {
    cy.visit('/search?term=l')
    cy.wait('@getLSearchResults')
    cy.get('[class*=itemList]').its('length').should('eq', 10)
    cy.get('[class=loadMore]').its('length').should('eq', 1)
  })

  it('should have 20 records', () => {
    cy.get('[class=loadMore]').click()
    cy.wait('@getLSearchResults')
    cy.get('[class*=itemList]').its('length').should('eq', 20)
  })
  
})