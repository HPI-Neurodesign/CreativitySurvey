import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { AUTConfig, CollaboConfig, SurveyConfig } from "../data/surveyConfig";
import { SurveyState } from "../data/surveyState";

export function CreativityTestExperience({
  state,
  setState,
  advance,
  config,
}: {
  state: SurveyState;
  setState: Dispatch<SetStateAction<SurveyState>>;
  advance: () => void;
  config: SurveyConfig;
}) {
  const [unfilledVariables, setUnfilledVariables] = useState(true);

  function updateState(newState: SurveyState) {
    setState(newState);
    setUnfilledVariables(
      newState.creativityTestExperience === null ||
        newState.creativityTestExperience === ""
    );
  }

  const autText = config.pages.some((page) => page.type === "AUT")
    ? `
    finding uncommon uses for a ${
      (config.pages.find((page) => page.type === "AUT") as AUTConfig).object
    }`
    : "";

  const collaboUseText = config.pages.some((page) => page.type === "collaboUse")
    ? `designing ${
        (
          config.pages.find(
            (page) => page.type === "collaboUse"
          ) as CollaboConfig
        ).prompt
      }`
    : "";

  const taskDescriptions: string[] = config.pages
    .filter((page) => page.type === "AUT" || page.type === "collaboUse")
    .map((page) => (page.type === "AUT" ? autText : collaboUseText));

  return (
    <>
      <h1>Survey - Association Game</h1>

      <div className={"formContainer"}>
        <p style={{ marginBottom: "-10px" }}>
          Now you have played{" "}
          {taskDescriptions.length === 1
            ? "one"
            : taskDescriptions.length === 2
            ? "two"
            : ""}{" "}
          association game{taskDescriptions.length > 1 ? "s" : ""},{" "}
          {taskDescriptions.length > 1 ? "first " : ""}
          {taskDescriptions[0]}
          {taskDescriptions.length > 1
            ? ` and then ${taskDescriptions[1]}`
            : ""}
          . Have you ever worked on a similar task before, where you should find
          many and unconventional solutions in a challenge like this?
        </p>

        <FormControl component="fieldset" className={"formControl"}>
          <RadioGroup
            aria-label="aut_experience"
            name="aut_experience"
            value={state.creativityTestExperience}
            onChange={(event) =>
              updateState({
                ...state,
                creativityTestExperience: event.target.value,
              })
            }
          >
            <FormControlLabel
              value="unsure"
              control={<Radio />}
              label="I am not sure"
            />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          </RadioGroup>
        </FormControl>

        {unfilledVariables && (
          <p className="buttonHelperText">
            All fields must be filled before proceeding
          </p>
        )}
        <Button
          variant="contained"
          color="primary"
          className={"submitButton"}
          disabled={unfilledVariables}
          onClick={advance}
        >
          Next
        </Button>
      </div>
    </>
  );
}
