import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import {
  BigFiveData,
  bigFiveQuestions,
  BigFiveStatement,
  Trait,
} from "../data/BigFiveData";
import { SurveyState } from "../data/surveyState";
import { BigFiveConfig } from "../data/surveyConfig";

export function BigFive({
  state,
  setState,
  advance,
  config,
}: {
  state: SurveyState;
  setState: Dispatch<SetStateAction<SurveyState>>;
  advance: () => void;
  config: BigFiveConfig;
}) {
  const [unfilledVariables, setUnfilledVariables] = useState(true);

  useEffect(() => {
    if (!state.bigFive) {
      setState({
        ...state,
        bigFive: new BigFiveData(),
      });
    }
  }, [state.bigFive]);

  function saveAnswer(newValue: number, key: keyof BigFiveData) {
    const newState: SurveyState = {
      ...state,
      bigFive: { ...state.bigFive!, [key]: newValue },
    };
    setState(newState);
    setUnfilledVariables(
      Object.entries(newState.bigFive ?? {})
        .filter(
          ([title, _i]) =>
            config.includeIncomeQuestions ||
            (bigFiveQuestions[title as keyof BigFiveData] as BigFiveStatement)
              .trait !== Trait.Income
        )
        .some(([, value]) => value === null)
    );
  }

  function RadioButtons(key: string) {
    return (
      <RadioGroup
        row
        aria-label="anonymous"
        name="anonymous"
        value={state.bigFive![key as keyof BigFiveData]}
        onChange={(event) =>
          saveAnswer(parseInt(event.target.value), key as keyof BigFiveData)
        }
      >
        <FormControlLabel
          value={-2}
          control={<Radio />}
          labelPlacement="bottom"
          label="Disagree strongly"
        />
        <FormControlLabel
          value={-1}
          control={<Radio />}
          labelPlacement="bottom"
          label="Disagree a little"
        />
        <FormControlLabel
          value={0}
          control={<Radio />}
          labelPlacement="bottom"
          label="Neutral"
        />
        <FormControlLabel
          value={1}
          control={<Radio />}
          labelPlacement="bottom"
          label="Agree a little"
        />
        <FormControlLabel
          value={2}
          control={<Radio />}
          labelPlacement="bottom"
          label="Agree strongly"
        />
      </RadioGroup>
    );
  }

  if (!state.bigFive) return null;
  return (
    <div className={"formContainer"}>
      <h1>Survey - Questionnaire</h1>

      <p>
        Here are a number of characteristics that may or may not apply to you.
        For example, do you agree that you are someone who likes to spend time
        with others? Please select an answer for each statement to indicate the
        extent to which you agree or disagree with that statement.
      </p>

      {Object.entries(bigFiveQuestions)
        .filter(
          ([, statement]: [string, BigFiveStatement]) =>
            config.includeIncomeQuestions || statement.trait !== Trait.Income
        )
        .map(([key, activity]: [string, BigFiveStatement], index: number) => {
          return (
            <div
              key={index}
              className={index % 2 === 1 ? "highlightGrey" : "highlightWhite"}
            >
              <p style={{ marginTop: "20px" }}></p>I am someone
              <b>{" " + activity.statement}</b>
              {RadioButtons(key)}
            </div>
          );
        })}

      {unfilledVariables && (
        <p className="buttonHelperText">
          All fields must be filled before proceeding
        </p>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={advance}
        className="submitButton"
        disabled={unfilledVariables}
      >
        Next
      </Button>
    </div>
  );
}
