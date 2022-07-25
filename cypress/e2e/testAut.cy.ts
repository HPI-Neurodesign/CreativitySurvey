/// <reference types="cypress" />

import { getKeyFromSurveyState, loadMinimalConfig } from "../test_helpers";
import { AUTAnswer } from "../../src/data/surveyState";

//Test AUT length
describe("AUT", function () {
  const item = "iron";
  const ideas = ["first", "second", "third", "fourth"];
  const idea = "idea";

  it("should allow navigating through AUT", function () {
    loadMinimalConfig([
      { type: "AUT", duration: 5, object: item, selectBestIdeas: true },
    ]);

    cy.contains("Survey - Association Game");
    cy.contains("original uses");
    cy.contains(item).should("not.exist");
    cy.contains("Start").click();
    cy.contains(item);
    cy.get(":input[type=text]").type(idea);
    cy.contains("Enter").click();
    cy.contains(idea);

    cy.wait(6000);
    cy.contains("Time's up");
    cy.contains("Next").should("be.enabled");
    cy.contains("Next").click();
  });

  it("should allow adding multiple items in AUT", function () {
    loadMinimalConfig([
      { type: "AUT", duration: 5, object: item, selectBestIdeas: true },
    ]);
    cy.contains("Start").click();

    cy.get(":input[type=text]").type(ideas[0]);
    cy.contains("Enter").click();
    cy.contains(ideas[0]);

    cy.get(":input[type=text]").type(ideas[1]);
    cy.contains("Enter").click();
    cy.contains(ideas[0]);
    cy.contains(ideas[1]);

    cy.get(":input[type=text]").type(ideas[2]);
    cy.contains("Enter").click();
    cy.contains(ideas[0]);
    cy.contains(ideas[1]);
    cy.contains(ideas[2]);

    cy.get(":input[type=text]").type(ideas[3]);
    cy.contains("Enter").click();
    cy.contains(ideas[0]);
    cy.contains(ideas[1]);
    cy.contains(ideas[2]);
    cy.contains(ideas[3]);

    cy.wait(6000).should(() => {
      expect(
        (getKeyFromSurveyState(localStorage, "autAnswers") as string[]).length
      ).to.eq(ideas.length);
    });
  });

  it("should allow pressing enter to submit items", function () {
    loadMinimalConfig([
      { type: "AUT", duration: 5, object: item, selectBestIdeas: true },
    ]);
    const idea = "idea";
    cy.contains("Start").click();
    cy.get(":input[type=text]").type(idea).type("{enter}");
    cy.contains(idea);
  });

  it("should submit the last item when the test is over", function () {
    loadMinimalConfig([
      { type: "AUT", duration: 5, object: item, selectBestIdeas: true },
    ]);
    const idea = "unfinished idea";
    cy.contains("Start").click();
    cy.get(":input[type=text]").type(idea);

    cy.wait(6000).should(() => {
      expect(
        getKeyFromSurveyState(localStorage, "autAnswers")[0]["answer"]
      ).to.eq(idea);
      expect(
        (getKeyFromSurveyState(localStorage, "autAnswers") as string[]).length
      ).to.eq(1);
    });
  });

  it("should not allow adding duplicate items", function () {
    loadMinimalConfig([
      { type: "AUT", duration: 5, object: item, selectBestIdeas: true },
    ]);
    cy.contains("Start").click();

    cy.get(":input[type=text]").type(ideas[0]);
    cy.contains("Enter").click();
    cy.get(":input[type=text]").type(ideas[0]);
    cy.contains("Enter").click();

    cy.contains("already made");

    cy.wait(6000).should(() => {
      expect(
        (getKeyFromSurveyState(localStorage, "autAnswers") as string[]).length
      ).to.eq(1);
    });
  });

  it("should require picking two best suggestions", function () {
    loadMinimalConfig([
      { type: "AUT", duration: 5, object: item, selectBestIdeas: true },
    ]);
    cy.contains("Start").click();

    cy.get(":input[type=text]").type(ideas[0]);
    cy.contains("Enter").click();
    cy.get(":input[type=text]").type(ideas[1]);
    cy.contains("Enter").click();
    cy.get(":input[type=text]").type(ideas[2]);
    cy.contains("Enter").click();
    cy.get(":input[type=text]").type(ideas[3]);
    cy.contains("Enter").click();

    cy.wait(5000).should(() => {
      const answers: AUTAnswer[] = getKeyFromSurveyState(
        localStorage,
        "autAnswers"
      ) as AUTAnswer[];
      answers.forEach((answer) => {
        expect(answer.selected).to.be.false;
      });
    });
    cy.get(":input[type=button]").should("be.disabled");

    cy.contains(ideas[0]).click();
    cy.get(":input[type=button]").should("be.disabled");

    cy.contains(ideas[1]).click();
    cy.get(":input[type=button]").should("not.be.disabled");

    cy.contains(ideas[2]).click();
    cy.get(":input[type=button]").should("be.disabled");

    cy.contains(ideas[2]).click();
    cy.get(":input[type=button]").should("not.be.disabled");

    cy.contains("Next")
      .click()
      .should(() => {
        const answers: AUTAnswer[] = getKeyFromSurveyState(
          localStorage,
          "autAnswers"
        ) as AUTAnswer[];
        answers.slice(0, 2).forEach((answer) => {
          expect(answer.selected).to.be.true;
        });
        answers.slice(2).forEach((answer) => {
          expect(answer.selected).to.be.false;
        });
      });
  });
});
