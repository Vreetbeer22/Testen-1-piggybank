/// <reference types="cypress" />

describe('beschrijving bij een overboeking', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login/')
    cy.get('.login__account').contains('Melvin').click()
    cy.url().should('eq', 'http://localhost:3000/')

    cy.visit('http://localhost:3000/transfer')
  })

  it('Beschrijving 1: overboeking met een beschrijving doen', () => {
    cy.get('select[name=toaccount]').select('Sophie de Blaak')
    cy.get('select[name=currency]').select('EURO')
    cy.get('input[name=amount]').type('10')
    cy.get('textarea[name=description]').type('test')
    cy.contains('button', 'Overboeken').click()

    cy.contains('h1', 'Gelukt!').should('be.visible')
    cy.contains('Het is gelukt om € 10 over te maken!').should('be.visible')
  })

  it('Beschrijving 2: beschrijving die te lang is geeft een foutmelding', () => {
    cy.get('select[name=toaccount]').select('Sophie de Blaak')
    cy.get('select[name=currency]').select('EURO')
    cy.get('input[name=amount]').type('10')
    cy.get('textarea[name=description]').type('a'.repeat(251), { delay: 0 })
    cy.contains('button', 'Overboeken').click()

    cy.contains('te lang').should('be.visible')
    cy.contains('h1', 'Gelukt!').should('not.exist')
  })

  it('Beschrijving 3: beschrijving met rare tekens geeft een foutmelding', () => {
    cy.get('select[name=toaccount]').select('Sophie de Blaak')
    cy.get('select[name=currency]').select('EURO')
    cy.get('input[name=amount]').type('10')
    cy.get('textarea[name=description]').type('test@❀🪐❥∏')
    cy.contains('button', 'Overboeken').click()

    cy.contains('niet geldig').should('be.visible')
    cy.contains('h1', 'Gelukt!').should('not.exist')
  })
})