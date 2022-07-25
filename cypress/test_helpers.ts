/// <reference types="cypress" />

import { ConfigPages, SurveyConfig } from "../src/data/surveyConfig";

export const survey = "http://localhost:3000";

export function getKeyFromSurveyState(storage: Storage, key: string) {
  return JSON.parse(storage.getItem("surveyState") ?? "")[key];
}

export function loadMinimalConfig(pages: ConfigPages) {
  loadConfig({
    dataUrl: "test",
    frontPage: "This is a test front page",
    title: "My Title",
    pages,
  });
}

export function loadConfig(config: SurveyConfig, proceedToPage = true) {
  const encodedConfig = btoa(JSON.stringify(config));
  cy.visit(`${survey}?config=${encodedConfig}`);
  if (proceedToPage) cy.contains("Start").click();
}
