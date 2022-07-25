/// <reference types="cypress" />
// @ts-check
import { loadMinimalConfig } from "../test_helpers";

describe("Creativity Test Experience", function () {
  describe("when only using AUT", function () {
    this.beforeEach(() => {
      loadMinimalConfig([
        {
          type: "creativityTestExperience",
        },
        {
          type: "AUT",
          duration: 0,
          object: "melon",
          selectBestIdeas: false,
        },
      ]);
    });

    it("should show the correct number of tests done", () => {
      cy.contains("one association game");
      cy.contains("first").should("not.exist");
      cy.contains("then").should("not.exist");
    });

    it("should show the correct object used", () => {
      cy.contains("finding uncommon uses for a melon");
    });
  });

  describe("when only using CollaboUse", function () {
    this.beforeEach(() => {
      loadMinimalConfig([
        {
          type: "creativityTestExperience",
        },
        {
          type: "collaboUse",
          duration: 0,
          selectBestIdeas: false,
          prompt: "instruments made from fruit",
          items: [],
        },
      ]);
    });

    it("should show the correct number of tests done", () => {
      cy.contains("one association game");
      cy.contains("first").should("not.exist");
      cy.contains("then").should("not.exist");
    });

    it("should show the correct object used", () => {
      cy.contains("designing instruments made from fruit");
    });
  });

  describe("when only using both AUT and CollaboUse", function () {
    this.beforeEach(() => {
      loadMinimalConfig([
        {
          type: "creativityTestExperience",
        },
        {
          type: "collaboUse",
          duration: 0,
          selectBestIdeas: false,
          prompt: "instruments made from fruit",
          items: [],
        },
        { type: "AUT", duration: 0, object: "melon", selectBestIdeas: false },
      ]);
    });

    it("should show the correct number of tests done", () => {
      cy.contains("two association games");
    });

    it("should show the correct object used", () => {
      cy.contains("instruments made from fruit");
      cy.contains("melon");
    });

    it("should use the correct order", () => {
      cy.contains("first designing instruments made from fruit");
      cy.contains("then finding uncommon uses for a melon");
    });
  });
});
