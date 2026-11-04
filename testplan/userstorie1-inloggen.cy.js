/// <reference types="cypress" />

describe('succesvol inloggen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login/')
  })

  it('Toon het scherm met de gebruikers', () => {
    cy.contains('h1', 'Login').should('be.visible');
    cy.contains('h2', 'Kies een account').should('be.visible');

    cy.get('.login__account').should('have.length', 4);
    cy.get('.login__account').contains('Melvin').should('be.visible');
    cy.get('.login__account').contains('Sara').should('be.visible');
    cy.get('.login__account').contains('Cem').should('be.visible');
    cy.get('.login__account').contains('Sophie').should('be.visible');
  })

  it('klik op de gebruiker', () => {
    cy.get('.login__account').contains('Melvin').click();

    cy.url().should('eq', 'http://localhost:3000/')

    cy.contains('Melvin').should('be.visible');
  })

})