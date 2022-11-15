import React, { useEffect, Dispatch, SetStateAction } from "react";
import { FormControlLabel, Checkbox, TextField } from "@mui/material";
import {
  creativeAchievementsData,
  categoryOrder,
  shortCategoryNames,
  CategoryNames,
} from "../data/CreativeAchievementsData";
import { SurveyState } from "../data/surveyState";

export function CreativeAchievementCategory({
  state,
  setState,
  page,
  setNextButtonDisabled,
}: {
  state: SurveyState;
  setState: Dispatch<SetStateAction<SurveyState>>;
  page: number;
  setNextButtonDisabled: (arg0: boolean) => void;
}) {
  function checkUnfilledVariables(category: string, newState: SurveyState) {
    const setItems = newState.creativeAchievements!.achievements[
      category
    ].filter((e) => e !== false);
    setNextButtonDisabled(setItems.length === 0);
  }

  useEffect(() => {
    const category = categoryOrder[page];
    const shortName: string =
      shortCategoryNames[category as keyof CategoryNames];

    checkUnfilledVariables(shortName, state);
  });

  function updateItemInCategory(
    category: string,
    index: number,
    value: boolean | number
  ) {
    const shortName: string =
      shortCategoryNames[category as keyof CategoryNames];
    setState((s) => {
      const ca = Object.assign({}, s.creativeAchievements?.achievements);
      ca[shortName][index] = value;

      return {
        ...s,
        CA: ca,
      };
    });
  }
  const category = categoryOrder[page];
  const activities = creativeAchievementsData[category];
  const shortName: string = shortCategoryNames[category as keyof CategoryNames];

  //TODO spelling in sentence
  return (
    <div>
      <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
      <p>
        Check the box next to all sentences that apply to you.<br></br> Next to
        sentences with an asterisk (*), write the number of times this
        appertains to you.
      </p>
      {activities.map((activity: string, index: number) => (
        <div key={activity}>
          {activity.startsWith("*") ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                type="number"
                inputProps={{ style: { padding: "8px" } }}
                style={{ maxWidth: "60px", marginRight: "16px" }}
                value={
                  state.creativeAchievements?.achievements[shortName][index] ===
                  false
                    ? 0
                    : state.creativeAchievements?.achievements[shortName][index]
                }
                onChange={(event) => {
                  if (parseInt(event.target.value) < 0) return;
                  updateItemInCategory(
                    category,
                    index,
                    parseInt(event.target.value)
                  );
                }}
              />
              <p style={{ marginTop: "10px" }}>{activity}</p>
            </div>
          ) : (
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    state.creativeAchievements?.achievements[shortName][
                      index
                    ] ?? false
                  }
                  name="0"
                  onChange={(_e, checked) =>
                    updateItemInCategory(category, index, checked)
                  }
                />
              }
              label={activity}
            />
          )}
        </div>
      ))}
    </div>
  );
}
