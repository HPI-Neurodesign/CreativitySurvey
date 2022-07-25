import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { SurveyState } from "../data/surveyState";
import { CAF } from "../data/CreativeAchievementsData";

export function CreativeAchievementsFinal({
  state,
  setState,
}: {
  state: SurveyState;
  setState: Dispatch<SetStateAction<SurveyState>>;
}) {
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target as HTMLInputElement;
    setState({
      ...state,
      creativeAchievements: {
        ...state.creativeAchievements!,
        additionalCA: text.value,
      },
    });
  };

  function buildCheckBox(field: keyof CAF, label: string) {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={state.creativeAchievements?.features[field] ?? false}
            name={field}
            onChange={(_e, checked) =>
              setState((state) => ({
                ...state,
                creativeAchievements: {
                  ...state.creativeAchievements!,
                  features: {
                    ...state.creativeAchievements!.features,
                    [field]: checked,
                  },
                },
              }))
            }
          />
        }
        label={label}
      />
    );
  }

  return (
    <>
      <div style={{ flexDirection: "column", display: "flex" }}>
        <p>
          Please list other creative achievements not mentioned in the previous
          questions.
        </p>
        <div>
          <TextField
            className="creativeAchievementTextField"
            multiline
            fullWidth
            variant="outlined"
            onChange={handleTextChange}
          />
          <p style={{ marginTop: "10px" }}></p>
        </div>

        <div className="demographics">
          <p>Check the box next to all sentences that apply to you.</p>
          {buildCheckBox(
            "creativeAbility",
            "One of the first things people mention about me when introducing me to others is my creative ability in the previously mentioned areas."
          )}
          {buildCheckBox(
            "artistic",
            'People regularly accuse me of having an "artistic" temperament.'
          )}
          {buildCheckBox(
            "professor",
            'People regularly accuse me of being an "absent-minded professor" type.'
          )}
        </div>
      </div>
    </>
  );
}
