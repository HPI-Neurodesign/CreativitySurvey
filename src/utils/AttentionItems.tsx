import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabelProps,
} from "@mui/material";
import React from "react";
import { SurveyState } from "../data/surveyState";

export function FlowAttentionItem({
  state,
  updateState,
  index,
}: {
  state: SurveyState;
  updateState: (state: SurveyState) => void;
  index: number;
}) {
  const props = {
    labelPlacement: "bottom",
    control: <Radio />,
    label: "",
    className: "option",
  } as FormControlLabelProps;

  return (
    <div className="attentionItem">
      <p style={{ marginTop: "40px" }}></p>
      <b>
        If you are paying full attention to this survey, pick the &quot;
        Strongly agree&quot; option.
      </b>
      <RadioGroup
        row
        value={state.attentionItems[index]}
        onChange={(event) => {
          updateState({
            ...state,
            attentionItems: [
              ...state.attentionItems.slice(0, index),
              event.target.value === "correct",
              ...state.attentionItems.slice(index + 1),
            ],
          });
        }}
      >
        <FormControlLabel {...props} value="wrong0" label="Strongly disagree" />
        <FormControlLabel {...props} value="wrong1" />
        <FormControlLabel {...props} value="wrong2" />
        <FormControlLabel {...props} value="wrong3" label="Undecided" />
        <FormControlLabel {...props} value="wrong4" />
        <FormControlLabel {...props} value="wrong5" />
        <FormControlLabel {...props} value="correct" label="Strongly agree" />
      </RadioGroup>
    </div>
  );
}

export function DemographicsAttentionItem({
  state,
  updateState,
  index,
}: {
  state: SurveyState;
  updateState: (state: SurveyState) => void;
  index: number;
}) {
  function updateAttentionItem(value: string) {
    updateState({
      ...state,
      attentionItems: [
        ...state.attentionItems.slice(0, index),
        value === "correct",
        ...state.attentionItems.slice(index + 1),
      ],
    });
  }

  return (
    <FormControl
      component="fieldset"
      className={"formControl demographics attentionItem"}
    >
      <FormLabel component="legend">
        This item checks language proficiency, please mark the second answer
        option from the left labeled &quot;2&quot;.
      </FormLabel>
      <RadioGroup
        className="option"
        row
        value={state.attentionItems[index]}
        onChange={(event) => updateAttentionItem(event.target.value)}
      >
        <FormControlLabel value="wrong1" control={<Radio />} label="1" />
        <FormControlLabel value="correct" control={<Radio />} label="2" />
        <FormControlLabel value="wrong2" control={<Radio />} label="3" />
        <FormControlLabel value="wrong3" control={<Radio />} label="4" />
      </RadioGroup>
    </FormControl>
  );
}
