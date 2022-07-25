import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";
import { SurveyState } from "../../data/surveyState";

export function Education({
  state,
  updateState,
}: {
  state: SurveyState;
  updateState: (state: SurveyState) => void;
}) {
  return (
    <FormControl component="fieldset" className="formControl demographics">
      <FormLabel component="legend">
        What is the highest degree or level of school you have completed?
        <br></br>
        <em>If currently enrolled, highest degree received.</em>
      </FormLabel>
      <RadioGroup
        name="education"
        value={state.demographics.education ?? ""}
        onChange={(event) =>
          updateState({
            ...state,
            demographics: {
              ...state.demographics,
              education: parseInt(event.target.value),
            },
          })
        }
      >
        <FormControlLabel
          value={0}
          control={<Radio />}
          label="No schooling completed"
        />
        <FormControlLabel
          value={1}
          control={<Radio />}
          label="School up to 8th grade"
        />
        <FormControlLabel
          value={2}
          control={<Radio />}
          label="School up to 10th grade"
        />
        <FormControlLabel value={3} control={<Radio />} label="High school" />
        <FormControlLabel value={4} control={<Radio />} label="College" />
        <FormControlLabel
          value={5}
          control={<Radio />}
          label="Trade / technical / vocational training"
        />
        <FormControlLabel
          value={6}
          control={<Radio />}
          label="Bachelor's degree"
        />
        <FormControlLabel
          value={7}
          control={<Radio />}
          label="Master's degree"
        />
        <FormControlLabel
          value={8}
          control={<Radio />}
          label="Doctorate degree"
        />
      </RadioGroup>
    </FormControl>
  );
}
