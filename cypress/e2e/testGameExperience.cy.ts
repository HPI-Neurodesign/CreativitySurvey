/// <reference types="cypress" />
// @ts-check
import { getKeyFromSurveyState, loadMinimalConfig } from "../test_helpers";

describe("Video Game Experience", function () {
  this.beforeEach(() => {
    loadMinimalConfig([
      {
        type: "videoGameExperience",
      },
    ]);
  });

  it("allows entering game experience data", function () {
    cy.contains("Game Experience");

    cy.contains("Next").should("be.disabled");

    cy.contains("basically never").click();
    cy.contains("Next").should("be.disabled");

    cy.contains("Seldom").click();
    cy.contains("Next").should("be.disabled");
    cy.get("label:contains(Seldom)").click({ multiple: true });
    cy.contains("Next").should("be.enabled");
  });

  it("saves game experience data", function () {
    cy.contains("Game Experience");

    cy.contains("Seldom").click();
    cy.get("label:contains(Seldom)").click({ multiple: true });
    cy.contains("basically never").click();

    cy.contains("Next")
      .should("be.enabled")
      .click()
      .then(() => {
        const gameExperience = getKeyFromSurveyState(
          localStorage,
          "gameExperience"
        );
        expect(gameExperience).to.have.keys(
          "experience",
          "genres",
          "platforms"
        );
        expect(gameExperience.experience).to.equal(0);
        expect(Object.entries(gameExperience["genres"])).to.have.length(6);
        Object.values(gameExperience["genres"]).forEach((entry) =>
          expect(entry).to.eq(2)
        );
        expect(Object.values(gameExperience["platforms"])).to.have.length(3);
        Object.values(gameExperience["platforms"]).forEach((entry) =>
          expect(entry).to.eq(1)
        );
      });
  });
});
