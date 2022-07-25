import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { isInTestMode } from "../Welcome";
import { durationToString, TestState, timerString } from "../utils/utils";
import {
  CollaboUseSuggestion,
  CollaboUseSuggestionItem,
} from "../data/CollaboUseData";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DarkerDisabledTextField } from "../utils/DarkerTextField";
import { SurveyState } from "../data/surveyState";
import { CollaboConfig } from "../data/surveyConfig";

export function CollaboUse({
  state,
  setState,
  advance,
  config,
}: {
  state: SurveyState;
  setState: Dispatch<SetStateAction<SurveyState>>;
  advance: () => void;
  config: CollaboConfig;
}) {
  const collaboUseLength = isInTestMode ? 10 * 1000 : config.duration * 1000;

  const [currentStatus, setCurrentStatus] = useState(TestState.before);
  const [suggestions, setSuggestions] = useState([
    { title: "", items: [], id: uuid(), selected: false },
  ] as CollaboUseSuggestion[]);

  const [timeLeft, setTimeLeft] = useState(collaboUseLength);
  const [startTime, setStartTime] = useState(null as null | number);

  const availableItems = config.items ?? [];
  const prompt = config.prompt;

  function onTimerEnded() {
    const newState = { ...state, collaboUseResult: suggestions };
    setState(newState);
    window.localStorage.setItem("surveyState", JSON.stringify(newState));
    setCurrentStatus(TestState.after);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime !== null) {
        setTimeLeft(collaboUseLength - (Date.now() - startTime));
      }
      if (startTime && timeLeft <= 0) {
        setStartTime(null);
        clearInterval(interval);
        onTimerEnded();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [startTime, timeLeft, setTimeLeft]);

  function addSuggestion() {
    const s = {
      title: "",
      items: [],
      id: uuid(),
      selected: false,
    };
    setSuggestions((oldSuggestions) => [...oldSuggestions, s]);
  }
  function editSuggestionTitle(id: string, title: string) {
    setSuggestions((oldSuggestions) =>
      oldSuggestions.map((s) => (s.id === id ? { ...s, title } : s))
    );
  }
  function addItem(suggestionId: string): CollaboUseSuggestionItem {
    const item = {
      item: null,
      id: uuid(),
    } as CollaboUseSuggestionItem;
    setSuggestions((oldSuggestions) =>
      oldSuggestions.map((s) =>
        s.id === suggestionId ? { ...s, items: [...s.items, item] } : s
      )
    );
    return item;
  }
  function editItem(suggestionId: string, itemId: string, value: string) {
    const item = {
      item: value,
      id: itemId,
    } as CollaboUseSuggestionItem;
    setSuggestions((oldSuggestions) =>
      oldSuggestions.map((s) =>
        s.id === suggestionId
          ? { ...s, items: s.items.map((i) => (i.id === item.id ? item : i)) }
          : s
      )
    );
  }
  function buildExample() {
    return (
      <div className="suggestion">
        <FormControl>
          <DarkerDisabledTextField
            label="Suggestion"
            style={{ marginRight: "0.5rem" }}
            variant="outlined"
            className="suggestion-inputs"
            value={config.example?.idea}
            disabled={true}
          />
        </FormControl>

        {config.example?.items.map((item, index) => (
          <FormControl key={index}>
            <DarkerDisabledTextField
              variant="outlined"
              style={{ marginRight: "0.5rem" }}
              className="item"
              label="Item"
              select
              value={item}
              disabled={true}
            >
              <MenuItem value={item}>{item}</MenuItem>
            </DarkerDisabledTextField>
          </FormControl>
        ))}
      </div>
    );
  }

  function showTask() {
    return (
      <>
        <h2
          style={{
            color: timeLeft <= 10 ? "crimson" : "black",
            marginTop: "0",
          }}
        >
          {timerString(timeLeft)}
        </h2>
        <h3>Think up ideas: What could be &quot;{prompt}&quot;</h3>

        <div className="items-list-container">
          <p className="item-description">
            Use and combine items from this list:
          </p>
          <div className="items-list">
            {availableItems.map((item) => {
              return <p key={item}>{item}</p>;
            })}
          </div>
        </div>

        <div className="flex">
          {config.example && <p className="example">Example:</p>}
          <div className="suggestion-box">
            {config.example && buildExample()}
            {suggestions.map((suggestion) => {
              return (
                <div className="suggestion" key={suggestion.id}>
                  <TextField
                    style={{ marginRight: "0.5rem" }}
                    variant="outlined"
                    placeholder="Your Suggestion"
                    className="suggestion-inputs"
                    value={suggestion.title}
                    onChange={(event) =>
                      editSuggestionTitle(suggestion.id, event.target.value)
                    }
                  />
                  {suggestion.items.map((item) => (
                    <Select
                      variant="outlined"
                      className="item"
                      key={item.id}
                      value={item.item ?? ""}
                      onChange={(event) =>
                        editItem(suggestion.id, item.id, event.target.value)
                      }
                    >
                      {availableItems.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  ))}
                  <FormControl>
                    <Select
                      variant="outlined"
                      className="item"
                      value=""
                      displayEmpty
                      style={{ color: "#999" }}
                      onChange={(event) => {
                        const item = addItem(suggestion.id);
                        editItem(suggestion.id, item.id, event.target.value);
                      }}
                    >
                      {[
                        <MenuItem key="empty" value="">
                          <em>Item</em>
                        </MenuItem>,
                        ...availableItems.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        )),
                      ]}
                    </Select>
                  </FormControl>
                </div>
              );
            })}
          </div>
        </div>
        <Button
          variant="contained"
          className="suggestion-button"
          onClick={addSuggestion}
        >
          Add Suggestion
        </Button>
      </>
    );
  }

  function showIntro() {
    return (
      <div className={"formContainer"}>
        <p>
          On the next page, you receive a design challenge and your task is to
          come up with many different solutions in{" "}
          {durationToString(config.duration)} time.
          <br></br>
          <br></br>
          For instance, your job can be to create “tools to survive in the
          wilderness”. As building material, you have ten objects. Use and
          combine them to create your solutions. For instance, when you have a
          blanket and sticks, you can combine them to build a tent to survive in
          the wilderness.
          <br></br>
          <br></br>
          Each of the ten objects can be re-used as often as you like.
          <br></br>
          <br></br>
          Try to produce as many, diverse, and original solutions as you can in
          the given time!
        </p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setCurrentStatus(TestState.during);
            setStartTime(Date.now() + 1000);
          }}
          className="startButton"
        >
          Start
        </Button>
      </div>
    );
  }
  function showEnd() {
    if (state.collaboUseResult === null) return null;
    const enoughAnswers = state.collaboUseResult.length >= 2;
    const error =
      state.collaboUseResult.filter((answer) => answer.selected).length !== 2;

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      if (!enoughAnswers || state.collaboUseResult === null) return;
      setState({
        ...state,
        collaboUseResult: [
          ...state.collaboUseResult.slice(0, index),
          {
            ...state.collaboUseResult[index],
            selected: event.target.checked,
          },
          ...state.collaboUseResult.slice(index + 1),
        ],
      });
    };
    return (
      <div className={"formContainer"}>
        <p>
          Time&apos;s up!
          {enoughAnswers && config.selectBestIdeas
            ? " Please select the two ideas from your list that you find most original."
            : " Click next to proceed with the survey."}
        </p>

        {enoughAnswers && config.selectBestIdeas && (
          <FormControl
            sx={{ m: 3 }}
            component="fieldset"
            variant="standard"
            error={error}
          >
            <FormLabel component="legend">Select Two</FormLabel>
            <FormGroup>
              {state.collaboUseResult.map(
                (answer: CollaboUseSuggestion, index: number) => (
                  <FormControlLabel
                    key={answer.id}
                    control={
                      <Checkbox
                        checked={answer.selected ?? false}
                        onChange={(event) => handleChange(event, index)}
                        name={answer.id}
                      />
                    }
                    label={
                      <p>
                        <span
                          style={{ fontWeight: "bold" }}
                        >{`${answer.title}:`}</span>
                        {` ${answer.items.map((item) => item.item).join(", ")}
                        `}
                      </p>
                    }
                  />
                )
              )}
            </FormGroup>
          </FormControl>
        )}

        <Button
          variant="contained"
          color="primary"
          className={"submitButton"}
          onClick={advance}
          disabled={enoughAnswers && config.selectBestIdeas && error}
        >
          Next
        </Button>
      </div>
    );
  }

  function content() {
    switch (currentStatus) {
      case TestState.before: {
        return showIntro();
      }
      case TestState.during: {
        return showTask();
      }
      case TestState.after: {
        return showEnd();
      }
      default: {
        return showIntro();
      }
    }
  }

  return (
    <>
      <h1>Survey - Association Game</h1>
      {content()}
    </>
  );
}
