/// <reference types="cypress" />
 
describe('vreemde valuta overmaken', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login/')
    cy.get('.login__account').contains('Melvin').click()
    cy.url().should('eq', 'http://localhost:3000/')
 
    cy.visit('http://localhost:3000/transfer')
  })
 
  it('Overboeken 5: geld overmaken in een vreemde valuta', () => {
    cy.get('select[name=toaccount]').select('Sophie de Blaak')
    cy.get('select[name=currency]').select('USD')
    cy.get('input[name=amount]').type('10')
    cy.get('textarea[name=description]').type('Test overboeking')
    cy.contains('button', 'Overboeken').click()
 
    cy.contains('h1', 'Gelukt!').should('be.visible')
    cy.contains('omgerekend').should('be.visible')
  })
 
  it('Overboeken 6: valuta die niet in het systeem zit geeft een foutmelding', () => {
    // De dropdown biedt geen onbekende valuta aan, dus we veranderen de valuta
    // in het verzoek naar de backend in een valuta die het systeem niet kent
    cy.intercept('POST', '**/transactions', (req) => {
      req.body.currency = 'JPY'
    }).as('overboeking')
 
    cy.get('select[name=toaccount]').select('Sophie de Blaak')
    cy.get('input[name=amount]').type('10')
    cy.get('textarea[name=description]').type('Test overboeking')
    cy.contains('button', 'Overboeken').click()
 
    // Controleer dat er echt een onbekende valuta is verstuurd
    cy.wait('@overboeking').its('request.body.currency').should('eq', 'JPY')
 
    cy.contains('niet ondersteund').should('be.visible')
  })
})