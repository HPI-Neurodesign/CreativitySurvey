import { Button } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  categoryOrder,
  shortCategoryNames,
  CategoryNames,
  CreativeCategories,
} from "../data/CreativeAchievementsData";
import { SurveyState } from "../data/surveyState";
import { CreativeAchievementCategory } from "./CreativeAchievementCategory";
import { CreativeAchievementsFinal } from "./CreativeAchievementsFinal";
import { CreativeAchievementsIntro } from "./CreativeAchievementsIntro";

export function CreativeAchievements({
  setState,
  state,
  advance,
  advancePage,
}: {
  state: SurveyState;
  setState: Dispatch<SetStateAction<SurveyState>>;
  advance: () => void;
  advancePage: () => void;
}) {
  const [caState, setCAState] = useState(0);
  const caMaxPages = Object.entries(shortCategoryNames).length;
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

  function advanceCA() {
    if (caState <= caMaxPages) {
      setNextButtonDisabled(false);
      setCAState(caState + 1);
      advancePage();
    } else {
      advance();
    }
    window.scrollTo(0, 0);
    window.localStorage.setItem("surveyState", JSON.stringify(state));
  }

  useEffect(() => {
    if (state.creativeAchievements) return;
    const creativeAchievement = {} as Record<string, boolean[]>;
    categoryOrder.map((category) => {
      const shortName: string =
        shortCategoryNames[category as keyof CategoryNames];
      creativeAchievement[shortName] = new Array(8).fill(false);
    });

    setState({
      ...state,
      creativeAchievements: {
        categories: {
          architecture: false,
          culinary: false,
          dance: false,
          business: false,
          humor: false,
          soloSports: false,
          inventions: false,
          music: false,
          science: false,
          teamSports: false,
          theatre: false,
          art: false,
          writing: false,
        } as CreativeCategories,
        achievements: creativeAchievement,
        additionalCA: "",
        features: {
          creativeAbility: false,
          artistic: false,
          professor: false,
        },
      },
    });
  });

  return (
    <div className={"formContainer"}>
      <h1>Survey - Questionnaire</h1>
      {caState === 0 && (
        <CreativeAchievementsIntro state={state} setState={setState} />
      )}
      {caState >= 1 && caState <= caMaxPages && (
        <CreativeAchievementCategory
          setState={setState}
          state={state}
          page={caState - 1}
          setNextButtonDisabled={setNextButtonDisabled}
        />
      )}
      {caState > caMaxPages && (
        <CreativeAchievementsFinal setState={setState} state={state} />
      )}
      {nextButtonDisabled && (
        <p className="buttonHelperText">
          You must select at least one option before proceeding
        </p>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="submitButton"
        disabled={nextButtonDisabled}
        onClick={advanceCA}
      >
        Next
      </Button>
    </div>
  );
}
