/// <reference types="cypress" />

describe("overboeken met onvoldoende saldo", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login/')
    cy.get('.login__account').contains('Melvin').click()
    cy.url().should('eq', 'http://localhost:3000/')

    cy.visit('http://localhost:3000/transfer')
  });

  it("Overboeken 4: geld overboeken met onvoldoende saldo geeft een foutmelding", () => {
    cy.get("select[name=toaccount]").select("Sophie de Blaak");
    cy.get("select[name=currency]").select("EURO");

    // Lees het saldo uit "Van rekening" (bijvoorbeeld "Melvin - €1234")
    // en vul een bedrag in dat 1 euro hoger is dan het saldo
    cy.get("select[name=account] option")
      .should("contain", "€")
      .invoke("text")
      .then((tekst) => {
        const saldo = parseFloat(tekst.split("€")[1]);
        const teVeel = (saldo + 1).toFixed(2);

        cy.get("input[name=amount]").type(teVeel);
      });

    cy.get("textarea[name=description]").type("Test overboeking");
    cy.contains("button", "Overboeken").click();

    cy.contains("saldo").should("be.visible");
    cy.contains("h1", "Gelukt!").should("not.exist");
  });
});
