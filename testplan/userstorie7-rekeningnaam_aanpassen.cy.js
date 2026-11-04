/// <reference types="cypress" />

describe('rekeningnaam wijzigen', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login/')
        cy.get('.login__account').contains('Melvin').click()
        cy.url().should('eq', 'http://localhost:3000/')

        cy.visit('http://localhost:3000/settings')
        cy.contains('h1', 'Account instellingen').should('be.visible')
    })

    it('Rekeningnaam 1: aanpassen naar een geldige nieuwe naam', () => {
        cy.get('input[name=accountName]').click().clear().type('Spaarrekening van Melvin')
        cy.contains('button', 'Opslaan').click()
    
        cy.contains('h1', 'Hoppa!').should('be.visible')
        cy.contains('Het is gelukt om je account bij te werken.').should('be.visible')
    
        cy.visit('http://localhost:3000/settings')
        cy.get('input[name=accountName]').should('have.value', 'Spaarrekening van Melvin')
    })

    it('Rekeningnaam 2: aanpassen zonder nieuwe naam geeft een foutmelding', () => {
        cy.get('input[name=accountName]').click().clear()
        cy.contains('button', 'Opslaan').click()
    
        cy.get('input[name=accountName]').should('match', ':invalid')
    })

    it('Rekeningnaam 3: speciale tekens voeren het script niet uit', () => {
        const alertStub = cy.stub()
        cy.on('window:alert', alertStub)
    
        cy.get('input[name=accountName]').click().clear()
        .type('<script>alert("test")</script>', { parseSpecialCharSequences: false })
        cy.contains('button', 'Opslaan').click()
        cy.contains('h1', 'Hoppa!').should('be.visible')
    
        cy.visit('http://localhost:3000/settings')
        cy.get('input[name=accountName]').should('have.value', '<script>alert("test")</script>')
        cy.then(() => {
        expect(alertStub).to.not.be.called
        })
    })

    it('Rekeningnaam 4: aanpassen naar een naam die al bestaat geeft een foutmelding', () => {
        cy.get('input[name=accountName]').click().clear().type('Rekening van Sophie')
        cy.contains('button', 'Opslaan').click()
    
        cy.contains('al een').should('be.visible')
    })
})