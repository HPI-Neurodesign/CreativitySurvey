import { TextField } from "@mui/material";
import React from "react";
import { SurveyState } from "../../data/surveyState";

export function Age({
  state,
  updateState,
}: {
  state: SurveyState;
  updateState: (state: SurveyState) => void;
}) {
  return (
    <TextField
      id="standard-basic"
      label="Age"
      style={{ maxWidth: "300px" }}
      onChange={(event) =>
        updateState({
          ...state,
          demographics: {
            ...state.demographics,
            age: parseInt(event.target.value),
          },
        })
      }
      type="number"
      InputLabelProps={{ shrink: true }}
    />
  );
}
