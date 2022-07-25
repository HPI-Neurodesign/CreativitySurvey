/// <reference types="cypress" />

import { getKeyFromSurveyState, loadMinimalConfig } from "../test_helpers";

const ideaOne = "My Idea";
const ideaTwo = "Another idea";

const prompt = "This is a prompt";
const items = ["a", "b", "c"];

describe("CollaboUse", function () {
  it("should allow navigation CollaboUse", function () {
    loadMinimalConfig([
      {
        type: "collaboUse",
        duration: 2,
        selectBestIdeas: true,
        prompt,
        items,
      },
    ]);

    cy.contains("Association Game");
    cy.contains(prompt).should("not.exist");
    cy.contains("Start").click();
    cy.wait(3 * 1000);
    cy.contains("Time's up");
  });

  it("should show correct prompt and items", function () {
    loadMinimalConfig([
      {
        type: "collaboUse",
        duration: 2,
        selectBestIdeas: true,
        prompt,
        items,
      },
    ]);
    cy.contains("Start").click();
    cy.contains(prompt);
    cy.get(".items-list>p").should("have.length", items.length);
    items.map((item) => {
      cy.contains(item);
    });
  });

  it("should render suggestions if set", function () {
    loadMinimalConfig([
      {
        type: "collaboUse",
        duration: 30,
        selectBestIdeas: true,
        prompt,
        items,
        example: {
          idea: "a great idea",
          items: ["greatItem", "greatItem2"],
        },
      },
    ]);
    cy.contains("Start").click();
    cy.contains(prompt);
    cy.contains("Example");
    cy.get("input").filter(":disabled").should("have.length", 3);
    cy.get("input[type=text]")
      .filter(":disabled")
      .should("have.value", "a great idea");
    cy.contains("greatItem");
    cy.contains("greatItem2");
  });

  it("should not render suggestions if null", function () {
    loadMinimalConfig([
      {
        type: "collaboUse",
        duration: 30,
        selectBestIdeas: true,
        prompt,
        items,
      },
    ]);
    cy.contains("Start").click();
    cy.contains("Example").should("not.exist");
    cy.contains(prompt);
    cy.get("input").filter(":disabled").should("have.length", 0);
  });

  it("should allow adding suggestions", function () {
    loadMinimalConfig([
      {
        type: "collaboUse",
        duration: 2,
        selectBestIdeas: true,
        prompt,
        items,
      },
    ]);
    cy.contains("Start").click();
    cy.get("input[type=text]").filter(":enabled").type(ideaOne);

    cy.contains("Add Suggestion").click();
    cy.get("input[type=text]").filter(":enabled").should("have.length", 2);
    cy.get("input[type=text]").filter(":enabled").eq(1).type(ideaTwo);

    cy.get(".MuiSelect-select").not(".Mui-disabled").should("have.length", 2);
  });

  it("should allow adding items to a suggestions", function () {
    loadMinimalConfig([
      {
        type: "collaboUse",
        duration: 5,
        selectBestIdeas: true,
        prompt,
        items,
      },
    ]);
    cy.contains("Start").click();
    cy.get("input").filter(":enabled").should("have.length", 2);

    cy.get("input[type=text]").filter(":enabled").type(ideaOne);
    cy.get(".MuiSelect-select").not(".Mui-disabled").click();
    cy.get(".MuiList-root>li").should("have.length", items.length + 1);
    cy.get(".MuiList-root").contains(items[0]).click();

    cy.get("input").filter(":enabled").should("have.length", 3);
    cy.get(".MuiSelect-select").not(".Mui-disabled").eq(1).click();
    cy.get(".MuiList-root>li").should("have.length", items.length + 1);
    cy.get(".MuiList-root").contains(items[1]).click();
  });

  it("should save added items", function () {
    loadMinimalConfig([
      {
        type: "collaboUse",
        duration: 5,
        selectBestIdeas: false,
        prompt,
        items,
      },
    ]);
    cy.contains("Start").click();
    cy.get("input[type=text]").filter(":enabled").type(ideaOne);

    cy.get("input").filter(":enabled").should("have.length", 2);
    cy.get(".MuiSelect-select").not(".Mui-disabled").click();
    cy.get(".MuiList-root>li").should("have.length", items.length + 1);
    cy.get(".MuiList-root").contains(items[0]).click();

    cy.get("input").filter(":enabled").should("have.length", 3);
    cy.get(".MuiSelect-select").not(".Mui-disabled").eq(1).click();
    cy.get(".MuiList-root>li").should("have.length", items.length + 1);
    cy.get(".MuiList-root").contains(items[1]).click();
    cy.get("input").filter(":enabled").should("have.length", 4);

    cy.contains("Add Suggestion").click();
    cy.get("input").filter(":enabled").should("have.length", 6);
    cy.get("input[type=text]").filter(":enabled").eq(1).type(ideaTwo);

    cy.get(".MuiSelect-select").not(".Mui-disabled").eq(3).click();
    cy.get(".MuiList-root>li").should("have.length", items.length + 1);
    cy.get(".MuiList-root").contains(items[2]).click();

    cy.get("input").filter(":enabled").should("have.length", 7);
    cy.get(".MuiSelect-select").not(".Mui-disabled").eq(4).click();
    cy.get(".MuiList-root>li").should("have.length", items.length + 1);
    cy.get(".MuiList-root").contains(items[2]).click();

    cy.wait(5000);
    cy.contains("Next")
      .click()
      .should(() => {
        const collaboResult = getKeyFromSurveyState(
          localStorage,
          "collaboUseResult"
        );
        const collaboString1 = JSON.stringify(collaboResult[0]);
        const collaboString2 = JSON.stringify(collaboResult[1]);
        expect(collaboString1).to.contain(ideaOne);
        expect(collaboString2).to.contain(ideaTwo);

        expect(collaboString1).to.contain(items[0]);
        expect(collaboString1).to.contain(items[1]);
        expect(collaboString2).to.contain(items[2]);
      });
  });
});
