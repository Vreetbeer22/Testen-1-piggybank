/// <reference types="cypress" />

describe('transacties bekijken', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login/')
    cy.get('.login__account').contains('Melvin').click()
    cy.url().should('eq', 'http://localhost:3000/')

    cy.visit('http://localhost:3000/transactions')
  })

  it('Transacties 1: de gebruiker kan zijn transacties bekijken', () => {
    cy.contains('h1', 'Transactie overzicht').should('be.visible')
 
    cy.request('http://localhost:8080/api/v1/transactions/1').then((response) => {
      const transacties = response.body.transactions
 
      cy.get('.transaction').should('have.length', transacties.length)
 
      const datums = transacties.map((transactie) => new Date(transactie.dateTime).getTime())
      const nieuwsteEerst = [...datums].sort((a, b) => b - a)
 
      expect(datums).to.deep.equal(nieuwsteEerst)
    })
  })
})