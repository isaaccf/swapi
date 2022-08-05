describe('Index', () => {
  beforeEach(() => {
    cy.window().then((win) => { win.sessionStorage.clear() })
    cy.intercept('GET', '**/people/1', { fixture: 'people/character1.json' })
    cy.visit('/character/1');
  })

  it('should load the page', () => {
    cy.get('[class*=characterName]').its('length').should('eq', 1)
    cy.get('[class*=characterName]').contains('Luke Skywalker')
  });

  it('should load the number of films', () => {
    cy.get('[class*=filmsTitle]').its('length').should('eq', 1)
    cy.get('[class*=filmsTitle]').contains('4 films')
    cy.get('li').its('length').should('eq', 4)
  });

  it('should have link to index', () => {
    cy.get('[class*=backText]').contains('back to main list')
  });
  
})