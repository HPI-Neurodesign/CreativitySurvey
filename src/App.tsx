import React, { useState, useEffect } from "react";
import { DemographicsSurvey } from "./demographics/DemographicsSurvey";
import { LinearProgress } from "@mui/material";
import { AUT } from "./creativityTests/AUT";
import "./App.css";
import { EndScreen } from "./EndScreen";
import { GameExperienceSurvey } from "./demographics/GameExperienceSurvey";
import { Welcome } from "./Welcome";
import { CollaboUse } from "./creativityTests/CollaboUse";
import { BigFive } from "./personalityTests/BigFive";
import { ExternalPage } from "./externalPages/ExternalPage";
import { SurveyConfig } from "./data/surveyConfig";
import { SurveyState } from "./data/surveyState";
import { CreativeAchievements } from "./creativityTests/CreativeAchievements";
import { CreativityTestExperience } from "./creativityTests/CreativityTestExperience";

function getNumberOfPages(config: SurveyConfig): number {
  let numberOfPages = 1; //always have at least the end screen
  numberOfPages += config.pages.length;
  numberOfPages += config.pages.find(
    (page) => page.type === "creativeAchievements"
  )
    ? 11
    : 0;
  numberOfPages += config.pages.reduce(
    (sum, page) =>
      sum + (page.type === "externalSite" && page.assessFlowAfterwards ? 1 : 0),
    0
  );
  return numberOfPages;
}

function ProgressBar({
  page,
  numberOfPages,
}: {
  page: number;
  numberOfPages: number;
}) {
  return (
    <>
      <LinearProgress
        style={{ height: "20px" }}
        variant="determinate"
        value={(page / numberOfPages) * 100}
      />
      <p className="pagesLeft">
        {numberOfPages - page} page
        {numberOfPages - page !== 1 ? "s" : ""} to go
      </p>
    </>
  );
}

export function App({ config }: { config: SurveyConfig }) {
  const [pageIndex, setPageIndex] = useState<number>(() => {
    const page = localStorage.getItem("page");
    if (!page) return 0;
    try {
      return parseInt(page);
    } catch {
      return 0;
    }
  });
  const [page, setPage] = useState(pageIndex);

  useEffect(() => {
    document.title = config.title;
  });

  const [surveyState, setSurveyState] = useState<SurveyState>(() => {
    const fallback = {
      id: null,
      //Demographics
      demographics: {
        age: null,
        education: null,
        gender: null,
        englishProficiency: null,
        country: null,
        training: null,
      },
      gameExperience: null,
      externalPages: Array(
        config.pages.filter((page) => page.type === "externalSite").length
      ).fill({ code: null, flow: null }),
      //Creativity Tests
      autAnswers: [],
      collaboUseResult: [],
      creativeAchievement: null,
      creativityTestExperience: null,
      //B5
      bigFive: null,
      //Other
      attentionItems: [],
    };

    const data = localStorage.getItem("surveyState");
    if (!data) return fallback;
    try {
      return JSON.parse(data);
    } catch {
      return fallback;
    }
  });

  function advance(): void {
    setPageIndex((page) => page + 1);
    setPage((page) => page + 1);
    window.scrollTo(0, 0);
    window.localStorage.setItem("page", pageIndex.toString());
    window.localStorage.setItem("surveyState", JSON.stringify(surveyState));
  }
  const handleBeforeunload = (event: BeforeUnloadEvent) => {
    if (pageIndex === config.pages.length) return;
    event.preventDefault();
    event.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeunload, true);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeunload, true);
    };
  });

  function renderPage() {
    const pageConfig = config.pages[pageIndex - 1];
    const attentionItems = config.pages.filter(
      (page) =>
        (page.type === "demographics" && page.includeAttentionItem) ||
        (page.type === "externalSite" &&
          page.assessFlowAfterwards?.includeAttentionItem)
    );

    switch (pageConfig.type) {
      case "demographics":
        return (
          <DemographicsSurvey
            state={surveyState}
            setState={setSurveyState}
            advance={advance}
            config={pageConfig}
            attentionItemIndex={attentionItems.indexOf(pageConfig)}
          />
        );
      case "videoGameExperience":
        return (
          <GameExperienceSurvey
            state={surveyState}
            setState={setSurveyState}
            advance={advance}
          />
        );
      case "AUT": {
        return (
          <AUT
            state={surveyState}
            setState={setSurveyState}
            advance={advance}
            config={pageConfig}
          />
        );
      }
      case "collaboUse": {
        return (
          <CollaboUse
            state={surveyState}
            setState={setSurveyState}
            advance={advance}
            config={pageConfig}
          />
        );
      }
      case "creativeAchievements": {
        return (
          <CreativeAchievements
            setState={setSurveyState}
            state={surveyState}
            advance={advance}
            advancePage={() => setPage((page) => page + 1)}
          />
        );
      }
      case "bigFive": {
        return (
          <BigFive
            state={surveyState}
            setState={setSurveyState}
            advance={advance}
            config={pageConfig}
          />
        );
      }
      case "externalSite": {
        const index = config.pages
          .filter((page) => page.type === "externalSite")
          .findIndex((page) => {
            return page === pageConfig;
          });
        return (
          <ExternalPage
            key={index}
            externalPageIndex={index}
            state={surveyState}
            setState={setSurveyState}
            advance={advance}
            config={pageConfig}
            advancePage={() => setPage((page) => page + 1)}
            attentionItemIndex={attentionItems.indexOf(pageConfig)}
          />
        );
      }
      case "creativityTestExperience": {
        return (
          <CreativityTestExperience
            state={surveyState}
            setState={setSurveyState}
            advance={advance}
            config={config}
          />
        );
      }
    }
  }

  return (
    <>
      <ProgressBar page={page} numberOfPages={getNumberOfPages(config)} />
      {pageIndex === 0 && (
        <Welcome
          state={surveyState}
          setState={setSurveyState}
          advance={advance}
          config={config}
        />
      )}
      {pageIndex >= 1 && pageIndex <= config.pages.length && renderPage()}
      {pageIndex > config.pages.length && (
        <EndScreen state={surveyState} config={config} />
      )}
    </>
  );
}
