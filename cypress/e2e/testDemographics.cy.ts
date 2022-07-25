/// <reference types="cypress" />
// @ts-check
import { getKeyFromSurveyState, loadMinimalConfig } from "../test_helpers";

describe("Demographics", function () {
  it("allows entering demographics data", function () {
    loadMinimalConfig([
      {
        type: "demographics",
        age: true,
        country: true,
        education: true,
        englishProficiency: true,
        gender: true,
        training: true,
      },
    ]);
    cy.contains("Demographics");

    cy.contains("Next").should("be.disabled");

    cy.get(":input[type=number]").type("20");
    cy.contains("Other").click();
    cy.contains("10th grade").click();
    cy.contains("Next").should("be.disabled");
    cy.contains("Fluent").click();
    cy.contains("Next").should("be.disabled");
    //fill country
    cy.get(".MuiSelect-select").not(".Mui-disabled").should("have.length", 1);
    cy.get(".MuiSelect-select").not(".Mui-disabled").click();
    cy.get(".MuiList-root").contains("Germany").click();

    cy.contains("Sports").click();
    cy.contains("Music").click();

    cy.contains("Next")
      .should("be.enabled")
      .click()
      .should(() => {
        const demographics = getKeyFromSurveyState(
          localStorage,
          "demographics"
        );
        expect(demographics["age"]).to.equal(20);
        expect(demographics["gender"]).to.equal(2);
        expect(demographics["education"]).to.equal(2);
        expect(demographics["englishProficiency"]).to.equal(2);
        expect(demographics["country"]).to.equal("DE");
        Object.entries(demographics["training"]).forEach(([key, entry]) =>
          expect(entry).to.eq(key === "music" || key === "sports")
        );
      });
  });

  it("only shows selected fields", () => {
    loadMinimalConfig([
      {
        type: "demographics",
        age: true,
      },
    ]);
    cy.contains("Demographics");

    cy.contains("Next").should("be.disabled");
    cy.get(":input[type=number]").type("20");
    cy.contains("degree").should("not.exist");
    cy.contains("gender").should("not.exist");
    cy.contains("english").should("not.exist");
    cy.contains("Sports").should("not.exist");

    cy.contains("Next")
      .should("be.enabled")
      .click()
      .should(() => {
        const demographics = getKeyFromSurveyState(
          localStorage,
          "demographics"
        );
        expect(demographics["age"]).to.equal(20);
        expect(demographics["gender"]).to.be.null;
        expect(demographics["education"]).to.be.null;
        expect(demographics["englishProficiency"]).to.be.null;
        expect(demographics["country"]).to.be.null;
        expect(demographics["training"]).to.be.null;
      });
  });

  it("only shows selected fields", () => {
    loadMinimalConfig([
      {
        type: "demographics",
        gender: true,
      },
    ]);
    cy.contains("Demographics");

    cy.contains("Next").should("be.disabled");
    cy.contains("Age").should("not.exist");
    cy.contains("degree").should("not.exist");
    cy.contains("english").should("not.exist");
    cy.contains("Sports").should("not.exist");

    cy.contains("Female").click();
    cy.contains("Next")
      .should("be.enabled")
      .click()
      .should(() => {
        const demographics = getKeyFromSurveyState(
          localStorage,
          "demographics"
        );
        expect(demographics["age"]).to.be.null;
        expect(demographics["gender"]).to.equal(1);
        expect(demographics["education"]).to.be.null;
        expect(demographics["englishProficiency"]).to.be.null;
        expect(demographics["country"]).to.be.null;
        expect(demographics["training"]).to.be.null;
      });
  });
});
