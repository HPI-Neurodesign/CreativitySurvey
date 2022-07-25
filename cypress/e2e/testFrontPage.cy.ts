/// <reference types="cypress" />
// @ts-check
import { loadConfig } from "../test_helpers";

describe("should correctly render the front page", function () {
  it("should render front page correctly", function () {
    loadConfig(
      {
        dataUrl: "https://example.com/",
        frontPage: `
Some text about the survey   
## A sub heading

| A | B |
|---|---|
| C | D |
| D | E |`,
        title: "My Survey",
        pages: [],
      },
      false
    );
    cy.contains("Welcome to My Survey");
    cy.contains("Some text");
    cy.get("h2").contains("A sub heading");
    cy.get("table").contains("A");
  });
});
