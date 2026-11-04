/// <reference types="cypress" />
 
describe('overboeking zonder beschrijving', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login/')
    cy.get('.login__account').contains('Melvin').click()
 
    cy.visit('http://localhost:3000/transfer')
  })
 
  it('Overboeken 4: overboeking doen zonder beschrijving', () => {
    cy.get('select[name=toaccount]').select('Sophie de Blaak')
    cy.get('select[name=currency]').select('EURO')
    cy.get('input[name=amount]').type('10')
    // geen beschrijving invullen
    cy.contains('button', 'Overboeken').click()
 
    cy.contains('h1', 'Gelukt!').should('be.visible')
    cy.contains('Het is gelukt om € 10 over te maken!').should('be.visible')
  })
})