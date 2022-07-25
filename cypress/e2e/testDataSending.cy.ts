/// <reference types="cypress" />
// @ts-check
import { getKeyFromSurveyState, loadConfig } from "../test_helpers";

describe("Submit data", function () {
  it("should remove null values", function () {
    loadConfig({
      dataUrl: "https://example.com/",
      frontPage: "This is a test front page",
      title: "My Title",
      pages: [
        {
          type: "demographics",
          age: true,
          country: false,
          education: false,
          englishProficiency: false,
          gender: false,
          training: false,
        },
      ],
    });
    cy.contains("Demographics");
    cy.get(":input[type=number]").type("20");
    cy.intercept("https://example.com", {}).as("data");

    cy.contains("Next").click();

    cy.wait("@data").then((interception) => {
      const id = getKeyFromSurveyState(localStorage, "id");
      expect(interception.request.body).to.not.include(null);
      expect(JSON.parse(interception.request.body)).to.deep.equal({
        id,
        demographics: {
          age: 20,
        },
      });
    });
  });
});
