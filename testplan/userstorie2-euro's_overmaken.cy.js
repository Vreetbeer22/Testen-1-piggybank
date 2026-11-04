/// <reference types="cypress" />

describe('euro\'s overmaken', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login/')
    cy.get('.login__account').contains('Melvin').click()
    cy.url().should('eq', 'http://localhost:3000/')

    cy.visit('http://localhost:3000/transfer')
  })

  it('Overboeken 1: geld overmaken met een rekening waar geld op staat', () => {
    cy.get('select[name=toaccount]').select('Sophie de Blaak')
    cy.get('select[name=currency]').select('EURO')
    cy.get('input[name=amount]').type('10')
    cy.get('textarea[name=description]').type('Test overboeking')
    cy.contains('button', 'Overboeken').click()

    cy.contains('h1', 'Gelukt!').should('be.visible')
    cy.contains('Het is gelukt om € 10 over te maken!').should('be.visible')
  })

  it('Overboeken 2: bedrag van 0,- geeft een foutmelding', () => {
    cy.get('select[name=toaccount]').select('Sophie de Blaak')
    cy.get('select[name=currency]').select('EURO')
    cy.get('input[name=amount]').type('0')
    cy.get('textarea[name=description]').type('Test overboeking')
    cy.contains('button', 'Overboeken').click()

    cy.contains('€0,00').should('be.visible')
    cy.contains('h1', 'Gelukt!').should('not.exist')
  })

  it('Overboeken 3: zonder naar rekening geeft een foutmelding', () => {
    cy.get('select[name=currency]').select('EURO')
    cy.get('input[name=amount]').type('10')
    cy.get('textarea[name=description]').type('Test overboeking')
    cy.contains('button', 'Overboeken').click()

    cy.get('select[name=toaccount]').should('match', ':invalid')
    cy.contains('h1', 'Gelukt!').should('not.exist')
  })
})