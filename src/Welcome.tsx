import { useEffect, Dispatch, SetStateAction } from "react";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { SurveyState } from "./data/surveyState";
import MarkdownView from "react-showdown";
import { SurveyConfig } from "./data/surveyConfig";

export const isInTestMode =
  window.location.pathname === "/test" || window.location.pathname === "/test/";

export function Welcome({
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
  useEffect(() => {
    if (state.id === null) setState((state) => ({ ...state, id: uuidv4() }));
  }, [setState, state]);

  return (
    <div className={"formContainer"}>
      <h1>Welcome to {config.title}</h1>
      <MarkdownView
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        markdown={config.frontPage}
        options={{ tables: true, emoji: true }}
      />
      {config.mturk && (
        <p>
          For completing this study you receive a payment of{" "}
          {config.mturk.rewardAmount}
          {config.mturk.rewardCurrency} via Amazon Mechanical Turk. To obtain
          the payment, you need to complete the entire study and submit valid
          data.
        </p>
      )}
      <p>Have Fun!</p>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="startButton"
        onClick={advance}
      >
        Start
      </Button>
    </div>
  );
}
