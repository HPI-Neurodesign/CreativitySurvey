import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControlLabelProps,
} from "@mui/material";
import { FlowAnswer, flowQuestions } from "../data/FlowQuestionsData";
import { SurveyState } from "../data/surveyState";
import { FlowAttentionItem } from "../utils/AttentionItems";

export function FlowQuestionnaire({
  state,
  setState,
  advance,
  externalPageIndex,
  includeAttentionItem,
  attentionItemIndex,
}: {
  state: SurveyState;
  setState: Dispatch<SetStateAction<SurveyState>>;
  advance: () => void;
  externalPageIndex: number;
  includeAttentionItem: boolean;
  attentionItemIndex: number;
}) {
  const [unfilledVariables, setUnfilledVariables] = useState(true);

  useEffect(() => {
    // Initialize Flow Answers if needed
    if (!state.externalPages[externalPageIndex].flow) {
      setState({
        ...state,
        externalPages: [
          ...state.externalPages.slice(0, externalPageIndex),
          {
            ...state.externalPages[externalPageIndex],
            flow: new FlowAnswer(),
          },
          ...state.externalPages.slice(externalPageIndex + 1),
        ],
      });
    }
  });

  function saveAnswer(newValue: number, field: keyof FlowAnswer) {
    updateState({
      ...state,
      externalPages: [
        ...state.externalPages.slice(0, externalPageIndex),
        {
          ...state.externalPages[externalPageIndex],
          flow: {
            ...state.externalPages[externalPageIndex].flow!,
            [field]: newValue,
          },
        },
        ...state.externalPages.slice(externalPageIndex + 1),
      ],
    });
  }

  function updateState(newState: SurveyState) {
    setState(newState);
    setUnfilledVariables(
      Object.values(newState.externalPages[externalPageIndex].flow!).includes(
        null
      ) ||
        ((newState.attentionItems.length <= attentionItemIndex ||
          newState.attentionItems[attentionItemIndex] === null) &&
          includeAttentionItem)
    );
  }

  const props = {
    control: <Radio />,
    labelPlacement: "bottom",
    label: "",
  } as FormControlLabelProps;

  function RadioButtons(type: keyof FlowAnswer) {
    return (
      <RadioGroup
        row
        value={state.externalPages[externalPageIndex].flow![type] ?? null}
        onChange={(event) => saveAnswer(parseInt(event.target.value), type)}
      >
        <FormControlLabel value={-3} {...props} label="Strongly disagree" />
        <FormControlLabel value={-2} {...props} />
        <FormControlLabel value={-1} {...props} />
        <FormControlLabel value={0} {...props} label="Undecided" />
        <FormControlLabel value={1} {...props} />
        <FormControlLabel value={2} {...props} />
        <FormControlLabel value={3} {...props} label="Strongly agree" />
      </RadioGroup>
    );
  }

  if (!state.externalPages[externalPageIndex].flow) return null;
  return (
    <div className={"formContainer7answers"}>
      <h1>Survey - Game Questionnaire</h1>

      <p>
        Please recall your experience of the game you just completed. There are
        no right or wrong answers, please reply intuitively and honestly to help
        this research.
      </p>

      {Object.keys(flowQuestions).map((key: string, index: number) => (
        <div className="flow" key={index}>
          <p style={{ marginTop: "40px" }}></p>
          <b>{flowQuestions[key as keyof FlowAnswer]}</b>
          {RadioButtons(key as keyof FlowAnswer)}
        </div>
      ))}
      {includeAttentionItem && (
        <FlowAttentionItem
          state={state}
          updateState={updateState}
          index={attentionItemIndex}
        />
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
        onClick={advance}
        className="submitButton"
        disabled={unfilledVariables}
      >
        Next
      </Button>
    </div>
  );
}
