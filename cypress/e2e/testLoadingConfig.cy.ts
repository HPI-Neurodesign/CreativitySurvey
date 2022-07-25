/// <reference types="cypress" />
// @ts-check
import { SurveyConfig } from "../../src/data/surveyConfig";
import { survey } from "../test_helpers";

describe("Config Loading", function () {
  it("should show a zod error on an incorrect config", function () {
    const config = {
      dataUrl: "https://example.com/",
      title: "My Survey",
      pages: [],
    };
    const encodedConfig = btoa(JSON.stringify(config));
    cy.visit(`${survey}?config=${encodedConfig}`);

    cy.contains("An error occurred");
    cy.contains("while parsing the config");
    cy.contains("undefined").contains("frontPage");
  });

  it("should show an error when no config is provided", function () {
    cy.visit(survey);

    cy.contains("An error occurred");
    cy.contains("No config provided");
    cy.contains("config").contains("loadConfig");
  });

  it("should load config from url", function () {
    const configUrl = "test";
    const encodedConfig = btoa(configUrl);

    cy.intercept("GET", configUrl, {
      body: {
        dataUrl: "https://example.com/",
        title: "My Survey",
        pages: [],
        frontPage: "Some Content",
      } as SurveyConfig,
    });
    cy.visit(`${survey}?loadConfig=${encodedConfig}`);
    cy.contains("error").should("not.exist");
    cy.contains("My Survey");
    cy.contains("Some Content");
  });
});
