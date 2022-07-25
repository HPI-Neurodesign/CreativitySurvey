import { Button, TextField } from "@mui/material";
import React, { useState, Dispatch, SetStateAction } from "react";
import { SurveyState } from "../data/surveyState";
import { ExternalSiteConfig } from "../data/surveyConfig";
import { isInTestMode } from "../Welcome";
import { FlowQuestionnaire } from "./FlowQuestionnaire";

export function ExternalPage({
  state,
  setState,
  advance,
  externalPageIndex,
  config,
  advancePage,
  attentionItemIndex,
}: {
  state: SurveyState;
  setState: Dispatch<SetStateAction<SurveyState>>;
  advance: () => void;
  externalPageIndex: number;
  config: ExternalSiteConfig;
  advancePage: () => void;
  attentionItemIndex: number;
}) {
  const [showFlow, setShowFlow] = useState(false);
  const [code, setCode] = useState("");
  const [showError, setShowError] = useState(false);

  const codeHelperText =
    "Wrong code. Please enter the code displayed at the end screen of the game";

  const handleSubmit = () => {
    if (
      (code === "a" && isInTestMode) ||
      code === `${config.code}${state.id!}`
    ) {
      if (config.assessFlowAfterwards) {
        setShowFlow(true);
        advancePage();
      } else {
        advance();
      }
    } else {
      setCode("");
      setShowError(true);
    }
  };

  const url = `${config.externalUrl}${state.id ?? ""}${
    config.additionalUrlParameters
      ? config.additionalUrlParameters
          .map((param) => `&${param.parameter}=${param.value}`)
          .join("")
      : ""
  }`;

  function renderPage() {
    return (
      <div className="formContainer">
        <h1>Survey - {config.title}</h1>

        <p>
          Please click the button below to open the next task in a new tab.{" "}
          {config.description} At the end of the game a code will be displayed.
        </p>

        <a href={url} target="_blank" rel="noopener noreferrer">
          <Button variant="contained" color="primary" className="startButton">
            Open the game
          </Button>
        </a>

        <p>1. Copy the code using the button highlighted in red.</p>
        <img
          src={config.imagePath}
          className="image"
          alt="How to copy validation code"
        />

        <p>2. Then paste it here, using Ctrl + v</p>
        <TextField
          error={showError}
          id="standard-basic"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder={`${config.title} Code`}
          helperText={showError ? codeHelperText : ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={"submitButton formControl"}
          onClick={handleSubmit}
        >
          Next
        </Button>
      </div>
    );
  }

  return showFlow ? (
    <FlowQuestionnaire
      state={state}
      setState={setState}
      externalPageIndex={externalPageIndex}
      advance={advance}
      includeAttentionItem={
        config.assessFlowAfterwards?.includeAttentionItem ?? false
      }
      attentionItemIndex={attentionItemIndex}
    />
  ) : (
    renderPage()
  );
}
