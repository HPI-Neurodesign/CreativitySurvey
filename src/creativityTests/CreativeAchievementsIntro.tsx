import React, { Dispatch, SetStateAction } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import {
  CreativeCategories,
  creativeCategories,
} from "../data/CreativeAchievementsData";
import { SurveyState } from "../data/surveyState";

export function CreativeAchievementsIntro({
  state,
  setState,
}: {
  state: SurveyState;
  setState: Dispatch<SetStateAction<SurveyState>>;
}) {
  function updateItem(category: keyof CreativeCategories) {
    if (!state.creativeAchievements) return;
    setState({
      ...state,
      creativeAchievements: {
        ...state.creativeAchievements,
        categories: {
          ...state.creativeAchievements.categories,
          [category]: !state.creativeAchievements?.categories[category],
        },
      },
    });
  }

  return (
    <div style={{ flexDirection: "column", display: "flex" }}>
      <p>
        Place a check mark beside the areas in which you feel you have more
        talent, ability, or training than the average person.
      </p>
      {Object.keys(creativeCategories).map((cat: string) => {
        const category: string =
          creativeCategories[cat as keyof CreativeCategories];
        return (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={
                  state.creativeAchievements?.categories[
                    cat as keyof CreativeCategories
                  ] ?? false
                }
                name={category}
                onChange={() => updateItem(cat as keyof CreativeCategories)}
              />
            }
            label={category}
          />
        );
      })}
    </div>
  );
}
