describe('Index', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/people?page=1', { fixture: 'people/page1.json' })
    cy.intercept('GET', '**/people?page=2', { fixture: 'people/page2.json' })
    cy.intercept('GET', '**/people/1', { fixture: 'people/character1.json' })
    cy.visit('/')
    cy.wait(500)
  })

  it('should load the page', () => {
    cy.get('h1').contains('Star Wars API')
  });

  it('should load 10 elements', () => {
    cy.get('[class*=itemList]').its('length').should('eq', 10)
  });

  it('should load next elements', () => {
    cy.get('button[class*=loadMore]').click()
    cy.wait(500)
    cy.get('[class*=itemList]').its('length').should('eq', 20)
  });

  it('should navigate to detail', () => {
    cy.get('[class*=itemList]').first().click()
    cy.wait(500)
    cy.get('[class*=navigateBack]').its('length').should('eq', 1)
  });

  it('should navigate to search', () => {
    cy.get('input').type('luke{enter}');
    cy.url().should('include', 'search?term=luke') 
  });
  
})