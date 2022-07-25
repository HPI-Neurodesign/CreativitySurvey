/// <reference types="cypress" />

import { getKeyFromSurveyState, loadMinimalConfig } from "../test_helpers";

describe("Big Five", function () {
  it("should not allow passing the page without filling all items", function () {
    loadMinimalConfig([{ type: "bigFive", includeIncomeQuestions: false }]);

    cy.contains("characteristics");

    cy.get('.formContainer>div:contains("I am someone ")')
      .its("length")
      .should("eq", 15);

    cy.contains("All fields must be filled");
    cy.get(":input[type=submit]").should("be.disabled");

    cy.contains("Neutral").click();
    cy.get(":input[type=submit]").should("be.disabled");

    cy.get("label:contains(Neutral)").click({ multiple: true });

    cy.contains("All fields must be filled").should("not.exist");
    cy.get(":input[type=submit]").should("be.enabled");
    cy.log("submitting data with income");
    cy.get(":input[type=submit]")
      .click()
      .then(() => {
        const bigFive = Object.values(
          getKeyFromSurveyState(localStorage, "bigFive")
        );
        expect(bigFive).to.have.length(18);
        expect(bigFive.filter((val) => val === null)).to.have.length(3);
        expect(bigFive.filter((val) => val === 0)).to.have.length(15);
      });
  });

  it("should show and require filling questions on income, if configured in config", function () {
    loadMinimalConfig([{ type: "bigFive", includeIncomeQuestions: true }]);

    cy.contains("characteristics");

    cy.get('.formContainer>div:contains("I am someone ")')
      .its("length")
      .should("eq", 18);

    cy.contains("All fields must be filled");
    cy.get(":input[type=submit]").should("be.disabled");

    cy.contains("Neutral").click();
    cy.get(":input[type=submit]").should("be.disabled");

    cy.get("label:contains(Neutral)").click({ multiple: true });

    cy.contains("All fields must be filled").should("not.exist");
    cy.get(":input[type=submit]").should("be.enabled");

    cy.log("submitting data with income");
    cy.get(":input[type=submit]")
      .click()
      .then(() => {
        const bigFive = Object.values(
          getKeyFromSurveyState(localStorage, "bigFive")
        );
        expect(bigFive).to.have.length(18);
        expect(bigFive).to.deep.eq(new Array(18).fill(0));
      });
  });

  it("should save data from big five", function () {
    loadMinimalConfig([{ type: "bigFive", includeIncomeQuestions: true }]);

    cy.get("label:contains(Disagree strongly)").eq(0).click();
    cy.get("label:contains(Disagree strongly)").eq(1).click();
    cy.get("label:contains(Disagree strongly)").eq(2).click();
    cy.get("label:contains(Disagree a little)").eq(3).click();
    cy.get("label:contains(Disagree a little)").eq(4).click();
    cy.get("label:contains(Disagree a little)").eq(5).click();
    cy.get("label:contains(Neutral)").eq(6).click();
    cy.get("label:contains(Neutral)").eq(7).click();
    cy.get("label:contains(Neutral)").eq(8).click();
    cy.get("label:contains(Agree a little)").eq(9).click();
    cy.get("label:contains(Agree a little)").eq(10).click();
    cy.get("label:contains(Agree a little)").eq(11).click();
    cy.get("label:contains(Agree strongly)").eq(12).click();
    cy.get("label:contains(Agree strongly)").eq(13).click();
    cy.get("label:contains(Agree strongly)").eq(14).click();
    cy.get("label:contains(Agree strongly)").eq(15).click();
    cy.get("label:contains(Agree strongly)").eq(16).click();
    cy.get("label:contains(Agree strongly)").eq(17).click();

    cy.get(":input[type=submit]")
      .click()
      .then(() => {
        const bigFive = Object.values(
          getKeyFromSurveyState(localStorage, "bigFive")
        );
        expect(bigFive).to.have.length(18);
        expect(bigFive).to.deep.eq([
          -2, -2, -2, -1, -1, -1, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2,
        ]);
      });
  });
});
