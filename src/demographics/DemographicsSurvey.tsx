import React, { useState, Dispatch, SetStateAction } from "react";
import { Button } from "@mui/material";
import "../App.css";
import { SurveyState } from "../data/surveyState";
import { DemographicsConfig } from "../data/surveyConfig";
import { Age } from "./demographicWidgets.tsx/Age";
import { Education } from "./demographicWidgets.tsx/Education";
import { Gender } from "./demographicWidgets.tsx/Gender";
import { Country } from "./demographicWidgets.tsx/Country";
import { EnglishProficiency } from "./demographicWidgets.tsx/EnglishProficiency";
import { Training } from "./demographicWidgets.tsx/Training";
import { DemographicsAttentionItem } from "../utils/AttentionItems";

export function DemographicsSurvey({
  state,
  setState,
  advance,
  config,
  attentionItemIndex,
}: {
  state: SurveyState;
  setState: Dispatch<SetStateAction<SurveyState>>;
  advance: () => void;
  config: DemographicsConfig;
  attentionItemIndex: number;
}) {
  const [unfilledVariables, setUnfilledVariables] = useState(true);

  const updateState = (newState: SurveyState) => {
    setState(newState);

    setUnfilledVariables(
      ((newState.demographics.age === null && config.age) ||
        (newState.demographics.education === null && config.education) ||
        (newState.demographics.gender === null && config.gender) ||
        (newState.demographics.englishProficiency === null &&
          config.englishProficiency) ||
        ((newState.demographics.country === null ||
          newState.demographics.country === "") &&
          config.country) ||
        (newState.demographics.training === null && config.training) ||
        ((newState.attentionItems.length <= attentionItemIndex ||
          newState.attentionItems[attentionItemIndex] === null) &&
          config.includeAttentionItem)) ??
        false
    );
  };

  return (
    <form className="main">
      <div className={"formContainer demographics"}>
        <h1>Survey - Demographics</h1>

        {config.age && <Age state={state} updateState={updateState} />}
        {config.gender && <Gender state={state} updateState={updateState} />}
        {config.country && <Country state={state} updateState={updateState} />}

        {config.englishProficiency && (
          <EnglishProficiency state={state} updateState={updateState} />
        )}

        {config.country && (
          <Education state={state} updateState={updateState} />
        )}

        {config.includeAttentionItem && (
          <DemographicsAttentionItem
            state={state}
            updateState={updateState}
            index={attentionItemIndex}
          />
        )}

        {config.training && (
          //TODO create a "none of the above" option? to make sure you cant bypass the question
          <Training state={state} updateState={updateState} />
        )}

        {unfilledVariables && (
          <p className="buttonHelperText">
            All fields must be filled before proceeding
          </p>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={"submitButton formControl"}
          disabled={unfilledVariables}
          onClick={advance}
        >
          Next
        </Button>
      </div>
    </form>
  );
}
