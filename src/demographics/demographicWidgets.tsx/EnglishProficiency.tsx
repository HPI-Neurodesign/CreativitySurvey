import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";
import { SurveyState } from "../../data/surveyState";

export function EnglishProficiency({
  state,
  updateState,
}: {
  state: SurveyState;
  updateState: (state: SurveyState) => void;
}) {
  return (
    <FormControl component="fieldset" className="formControl demographics">
      <FormLabel component="legend">
        What is your English language proficiency?
      </FormLabel>
      <RadioGroup
        name="englishProficiency"
        value={state.demographics.englishProficiency}
        onChange={(event) =>
          updateState({
            ...state,
            demographics: {
              ...state.demographics,
              englishProficiency: parseInt(event.target.value),
            },
          })
        }
      >
        <FormControlLabel
          value={0}
          control={<Radio />}
          label="Basic – I can communicate on simple topics or know some phrases in this language."
        />
        <FormControlLabel
          value={1}
          control={<Radio />}
          label="Conversational – I can communicate on everyday topics with minor grammar or vocabulary mistakes"
        />
        <FormControlLabel
          value={2}
          control={<Radio />}
          label="Fluent – I have the ability to express any idea without hesitation, with good vocabulary and grammar; people understand me easily. Both my spoken and written skills are good."
        />
        <FormControlLabel
          value={3}
          control={<Radio />}
          label="Proficient – This language is my mother tongue, or I speak and write this language like a native speaker."
        />
      </RadioGroup>
    </FormControl>
  );
}
