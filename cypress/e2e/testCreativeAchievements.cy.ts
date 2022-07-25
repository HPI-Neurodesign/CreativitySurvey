/// <reference types="cypress" />
// @ts-check

import { getKeyFromSurveyState, loadMinimalConfig } from "../test_helpers";
import { categoryOrder } from "../../src/data/CreativeAchievementsData";

describe("Creative Achievements", function () {
  beforeEach(() => {
    loadMinimalConfig([
      {
        type: "creativeAchievements",
      },
    ]);
  });

  function navigateToFinalPage() {
    cy.get(":input[type=submit]").click();
    for (let i = 0; i < 10; i++) {
      cy.contains(/training|talent/g).click();
      cy.get(":input[type=submit]").click();
    }
  }

  it("should allow selecting multiple creative categories ", function () {
    cy.get(":input[type=submit]").should("be.enabled");
    cy.contains("Music").click();
    cy.contains("Humor").click();
    cy.contains("Creative writing").click();
    cy.get(":input[type=submit]")
      .should("be.enabled")
      .click()
      .then(() => {
        const creativeAchievements = getKeyFromSurveyState(
          localStorage,
          "creativeAchievements"
        )["categories"];
        expect(Object.values(creativeAchievements)).to.have.length(13);
        expect(creativeAchievements["music"]).to.eq(true);
        expect(creativeAchievements["teamSports"]).to.eq(false);
        expect(creativeAchievements["humor"]).to.eq(true);
        expect(creativeAchievements["writing"]).to.eq(true);
      });
  });

  it("should not allow passing single item page without checking anything", function () {
    cy.get(":input[type=submit]").click();

    cy.get(":input[type=submit]").should("be.disabled");
    cy.contains("You must select at least one option before proceeding");

    cy.contains("no training")
      .click()
      .then(() => {
        cy.get(":input[type=submit]").should("be.enabled");
        cy.contains(
          "You must select at least one option before proceeding"
        ).should("not.exist");
      });
  });

  it("should allow filling items with * with a number to proceed", function () {
    cy.get(":input[type=submit]").click();

    cy.get(":input[type=submit]").should("be.disabled");
    cy.contains("You must select at least one option before proceeding");
    cy.get(":input[type=number]")
      .type("7")
      .then(() => {
        cy.get(":input[type=submit]").should("be.enabled");
        cy.contains(
          "You must select at least one option before proceeding"
        ).should("not.exist");
      });
    cy.get(":input[type=submit]")
      .click()
      .then(() => {
        expect(getKeyFromSurveyState(localStorage, "CA")["arts"][7]).to.eq(7);
      });
  });

  it("should submit filled items correctly", function () {
    cy.get(":input[type=submit]").click();

    const category = "arts";
    cy.contains("Visual Arts");

    cy.get(":input[type=number]").type("7");
    cy.contains("lessons").click();
    cy.contains("gallery").click();

    cy.get(":input[type=submit]")
      .click()
      .then(() => {
        expect(
          Object.keys(getKeyFromSurveyState(localStorage, "CA"))
        ).to.have.length(10);
        expect(getKeyFromSurveyState(localStorage, "CA")).to.have.any.keys(
          category
        );
        expect(
          getKeyFromSurveyState(localStorage, "CA")[category]
        ).to.have.length(8);
        expect(getKeyFromSurveyState(localStorage, "CA")[category][0]).to.eq(
          false
        );
        expect(getKeyFromSurveyState(localStorage, "CA")[category][1]).to.eq(
          true
        );
        expect(getKeyFromSurveyState(localStorage, "CA")[category][7]).to.eq(7);
      });
  });

  it("should navigate through all categories", function () {
    cy.get(":input[type=submit]").click();

    categoryOrder.forEach((cat) => {
      cy.contains(cat);
      cy.contains(/training|talent/g).click();
      cy.get(":input[type=submit]").click();
    });
  });

  it("should allow listing other creative achievements", function () {
    navigateToFinalPage();
    const achievement = "writing tests";
    cy.contains("other creative achievements");
    cy.get(":input[type=submit]").should("be.enabled");
    cy.get(".creativeAchievementTextField").type(achievement);
    cy.get(":input[type=submit]").should("be.enabled");
    cy.contains("Next")
      .click()
      .then(() => {
        expect(
          getKeyFromSurveyState(localStorage, "creativeAchievements")[
            "additionalCA"
          ]
        ).to.eq(achievement);
      });
  });

  it("should save correctly when always picking the first option", function () {
    cy.get(":input[type=submit]").click();
    for (let i = 0; i < 10; i++) {
      cy.contains(/training|talent/g).click();
      cy.get(":input[type=submit]").click();
    }
    cy.contains("Survey").then(() =>
      Object.values(getKeyFromSurveyState(localStorage, "CA")).forEach(
        (entry) => {
          expect(entry).to.have.length(8);
          expect(entry).to.deep.eq([
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ]);
        }
      )
    );
  });

  it("should allow not selecting other statements", function () {
    navigateToFinalPage();

    cy.contains("creative ability");
    cy.contains("artistic");
    cy.contains("professor");

    cy.contains("Next")
      .should("be.enabled")
      .click()
      .should(() =>
        Object.values(
          getKeyFromSurveyState(localStorage, "creativeAchievements")[
            "features"
          ]
        ).forEach((entry) => {
          expect(entry).to.be.false;
        })
      );
  });

  it("should allow selecting other statements", function () {
    navigateToFinalPage();

    cy.contains("creative ability").click();
    cy.contains("artistic").click();
    cy.contains("professor").click();

    cy.contains("Next")
      .click()
      .should(() => {
        const features = Object.values(
          getKeyFromSurveyState(localStorage, "creativeAchievements")[
            "features"
          ]
        );
        expect(features).to.have.length(3);
        features.forEach((entry) => expect(entry).to.be.true);
      });
  });

  it("should allow changing your mind on other statements", function () {
    navigateToFinalPage();

    cy.contains("creative ability").click();
    cy.contains("artistic").click().click();
    cy.contains("professor").click();

    cy.contains("Next")
      .click()
      .should(() => {
        const features = getKeyFromSurveyState(
          localStorage,
          "creativeAchievements"
        )["features"];
        expect(Object.entries(features)).to.have.length(3);
        expect(features["artistic"]).to.be.false;
        expect(features["professor"]).to.be.true;
        expect(features["creativeAbility"]).to.be.true;
      });
  });
});
