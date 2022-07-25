import { loadMinimalConfig, getKeyFromSurveyState } from "../test_helpers";

describe("Attention Items", () => {
  it("demographics attention item, is shown, needs to be filles, is saved", () => {
    loadMinimalConfig([
      { type: "demographics", age: true, includeAttentionItem: true },
    ]);

    cy.contains("Demographics");
    cy.contains("please mark the");
    cy.contains("Next").should("be.disabled");
    cy.get(":input[type=number]").type("20");
    cy.contains("Next").should("be.disabled");
    cy.get(".attentionItem").contains("3").click();
    cy.contains("Next")
      .should("be.enabled")
      .click()
      .then(() => {
        const attentionItems = getKeyFromSurveyState(
          localStorage,
          "attentionItems"
        );
        expect(attentionItems).to.have.length(1);
        expect(attentionItems[0]).to.equal(false);
      });
  });

  it("flow attention item, is shown, needs to be filles, is saved", () => {
    loadMinimalConfig([
      {
        type: "externalSite",
        assessFlowAfterwards: { includeAttentionItem: true },
        code: "Test",
        description: "test",
        externalUrl: "https://test.com",
        imagePath: "test",
        title: "External",
      },
    ]);

    cy.contains("External");
    cy.contains("Next").then(() => {
      getKeyFromSurveyState(localStorage, "id");
      cy.get(":input[type=text]").type(
        `Test${getKeyFromSurveyState(localStorage, "id") as string}`
      );
    });
    cy.contains("Next").click();

    cy.contains("paying full attention");
    cy.contains("Next").should("be.disabled");
    cy.get(".flow").each(($flow) => {
      cy.wrap($flow).contains("Undecided").click();
    });
    cy.contains("Next").should("be.disabled");
    cy.get(".attentionItem .option").contains("Strongly agree").click();

    cy.contains("Next")
      .should("be.enabled")
      .click()
      .then(() => {
        const attentionItems = getKeyFromSurveyState(
          localStorage,
          "attentionItems"
        );
        expect(attentionItems).to.have.length(1);
        expect(attentionItems[0]).to.equal(true);
      });
  });

  it("should work with multiple attention items", () => {
    loadMinimalConfig([
      { type: "demographics", age: true, includeAttentionItem: true },
      {
        type: "externalSite",
        assessFlowAfterwards: { includeAttentionItem: true },
        code: "Test",
        description: "test",
        externalUrl: "https://test.com",
        imagePath: "test",
        title: "External",
      },
    ]);

    cy.contains("Demographics");
    cy.get(":input[type=number]").type("20");
    cy.get(".attentionItem .option").contains("2").click();
    cy.contains("Next")
      .should("be.enabled")
      .click()
      .then(() => {
        const attentionItems = getKeyFromSurveyState(
          localStorage,
          "attentionItems"
        );
        expect(attentionItems).to.have.length(1);
        expect(attentionItems[0]).to.equal(true);
        getKeyFromSurveyState(localStorage, "id");
        cy.get(":input[type=text]").type(
          `Test${getKeyFromSurveyState(localStorage, "id") as string}`
        );
      });
    cy.contains("Next").click();

    cy.get("label:contains(Undecided)").click({ multiple: true });
    cy.contains("Next")
      .should("be.enabled")
      .click()
      .then(() => {
        const attentionItems = getKeyFromSurveyState(
          localStorage,
          "attentionItems"
        );
        expect(attentionItems).to.have.length(2);
        expect(attentionItems[1]).to.equal(false);
      });
  });
});
