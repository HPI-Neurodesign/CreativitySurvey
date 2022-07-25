import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  TrainingOptions,
  trainingQuestion,
  trainingOptions,
} from "../../data/DemographicsData";
import { SurveyState } from "../../data/surveyState";

export function Training({
  state,
  updateState,
}: {
  state: SurveyState;
  updateState: (state: SurveyState) => void;
}) {
  useEffect(() => {
    if (state.demographics.training === null) {
      updateState({
        ...state,
        demographics: {
          ...state.demographics,
          training: {
            agriculture: false,
            history: false,
            architecture: false,
            business: false,
            computers: false,
            engineering: false,
            arts: false,
            health: false,
            law: false,
            languages: false,
            literature: false,
            maths: false,
            music: false,
            philosophy: false,
            public: false,
            sales: false,
            social: false,
            science: false,
            sports: false,
            teaching: false,
            tourism: false,
          },
        },
      });
    }
  }, []);

  function updateTraining(key: keyof TrainingOptions, checked: boolean) {
    if (state.demographics.training === null) return;
    updateState({
      ...state,
      demographics: {
        ...state.demographics,
        training: {
          ...state.demographics.training,
          [key]: checked,
        },
      },
    });
  }

  if (state.demographics.training === null) return null;
  return (
    <FormControl component="fieldset" className={"formControl demographics"}>
      <FormLabel component="legend">{trainingQuestion}</FormLabel>
      {Object.entries(trainingOptions).map(([key, answer]) => {
        return (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                checked={
                  state.demographics.training![key as keyof TrainingOptions]
                }
                onChange={(_e, checked) =>
                  updateTraining(key as keyof TrainingOptions, checked)
                }
                name={key}
              />
            }
            label={answer}
          />
        );
      })}
    </FormControl>
  );
}
