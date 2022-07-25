/// <reference types="cypress" />

import { getKeyFromSurveyState, loadMinimalConfig } from "../test_helpers";
import { flowQuestions } from "../../src/data/FlowQuestionsData";

describe("ExternalPage", function () {
  it("should the right external site and accept correct code", function () {
    loadMinimalConfig([
      {
        type: "externalSite",
        code: "Test",
        description: "my description",
        externalUrl: "",
        imagePath: "",
        title: "my title",
      },
    ]);
    cy.contains("my description");
    cy.contains("my title");

    cy.contains("Next").then(() => {
      getKeyFromSurveyState(localStorage, "id");
      cy.get(":input[type=text]").type(
        `False${getKeyFromSurveyState(localStorage, "id") as string}`
      );
    });
    cy.contains("Next").click();
    cy.contains("Wrong code");

    cy.contains("Next").then(() => {
      getKeyFromSurveyState(localStorage, "id");
      cy.get(":input[type=text]").type(
        `Test${getKeyFromSurveyState(localStorage, "id") as string}`
      );
    });
    cy.contains("Next").click();
    cy.contains("Wrong code").should("not.exist");
  });

  it("should display Flow questions if so configured", function () {
    loadMinimalConfig([
      {
        type: "externalSite",
        assessFlowAfterwards: { includeAttentionItem: false },
        code: "Test",
        description: "",
        externalUrl: "",
        imagePath: "",
        title: "",
      },
    ]);

    cy.contains("Next").then(() => {
      getKeyFromSurveyState(localStorage, "id");
      cy.get(":input[type=text]").type(
        `Test${getKeyFromSurveyState(localStorage, "id") as string}`
      );
    });
    cy.contains("Next").click();
    cy.contains("recall your experience");

    Object.values(flowQuestions).map((flow) => {
      cy.contains(flow);
    });
    cy.get(":input[type=submit]").should("be.disabled");

    cy.contains("Undecided").click();
    cy.get(":input[type=submit]").should("be.disabled");

    cy.get("label:contains(Undecided)").click({ multiple: true });
    cy.get(":input[type=submit]").should("not.be.disabled");
  });

  it("should open the right url", function () {
    loadMinimalConfig([
      {
        type: "externalSite",
        code: "Test",
        description: "",
        externalUrl: "https://example.com?id=",
        imagePath: "",
        title: "",
      },
    ]);

    cy.get("a").should(($element) => {
      const id = getKeyFromSurveyState(localStorage, "id") as string;
      expect($element).to.have.attr("href", `https://example.com?id=${id}`);
    });

    loadMinimalConfig([
      {
        type: "externalSite",
        code: "Test",
        description: "",
        externalUrl: "https://example.com?id=",
        imagePath: "",
        title: "",
        additionalUrlParameters: [
          {
            parameter: "test",
            value: "test",
          },
          {
            parameter: "x",
            value: "y",
          },
        ],
      },
    ]);

    cy.get("a").should(($element) => {
      const id = getKeyFromSurveyState(localStorage, "id") as string;
      expect($element).to.have.attr(
        "href",
        `https://example.com?id=${id}&test=test&x=y`
      );
    });
  });
});
