import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";
import { SurveyState } from "../../data/surveyState";

export function Gender({
  state,
  updateState,
}: {
  state: SurveyState;
  updateState: (state: SurveyState) => void;
}) {
  return (
    <FormControl component="fieldset" className="formControl demographics">
      <FormLabel component="legend">What is your gender?</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender"
        value={state.demographics.gender ?? ""}
        onChange={(event) =>
          updateState({
            ...state,
            demographics: {
              ...state.demographics,
              gender: parseInt(event.target.value),
            },
          })
        }
      >
        <FormControlLabel value={0} control={<Radio />} label="Male" />
        <FormControlLabel value={1} control={<Radio />} label="Female" />
        <FormControlLabel value={2} control={<Radio />} label="Other" />
        <FormControlLabel
          value={3}
          control={<Radio />}
          label="Prefer not to say"
        />
      </RadioGroup>
    </FormControl>
  );
}
