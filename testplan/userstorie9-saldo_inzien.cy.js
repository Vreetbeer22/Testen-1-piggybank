/// <reference types="cypress" />
 
describe('saldo overzicht bekijken', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login/')
    cy.get('.login__account').contains('Melvin').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
 
  it('Saldo 1: de gebruiker kan zijn saldo overzicht zien', () => {
    cy.intercept('GET', '**/accounts').as('rekeningen')
 
    cy.visit('http://localhost:3000/')
 
    cy.wait('@rekeningen').then(({ response }) => {
      const rekening = response.body.accounts[0]
 
      cy.contains(rekening.name).should('be.visible')
      cy.contains(rekening.balance).should('be.visible')
    })
  })
})