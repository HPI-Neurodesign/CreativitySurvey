import React, {
  ChangeEvent,
  createRef,
  KeyboardEvent,
  useRef,
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import {
  Button,
  TextField,
  Snackbar,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
} from "@mui/material";
import MuiAlert from "@mui/lab/Alert";
import "../App.css";
import { durationToString, TestState, timerString } from "../utils/utils";
import { AUTConfig } from "../data/surveyConfig";
import { SurveyState, AUTAnswer } from "../data/surveyState";
import { isInTestMode } from "../Welcome";

export function AUT({
  state,
  setState,
  advance,
  config,
}: {
  state: SurveyState;
  setState: Dispatch<SetStateAction<SurveyState>>;
  advance: () => void;
  config: AUTConfig;
}) {
  const autLength = isInTestMode ? 5000 : config.duration * 1000;

  const [wordList, setWordList] = useState([] as AUTAnswer[]);
  const [currentWord, setCurrentWord] = useState("");
  const [testState, setTestState] = useState(TestState.before);

  const wordListRef = useRef<AUTAnswer[]>(wordList);
  const currentWordRef = useRef<string>(currentWord);
  wordListRef.current = wordList;
  currentWordRef.current = currentWord;

  const textInput = createRef<HTMLDivElement>();
  const [open, setOpen] = useState(false);

  const [seconds, setSeconds] = useState(autLength);
  const [startTime, setStartTime] = useState(null as null | number);

  function constructAnswer(word: string) {
    const answer: AUTAnswer = {
      answer: word,
      secondsExpired: autLength - seconds,
      selected: config.selectBestIdeas ? false : null,
    };
    return answer;
  }

  const submitWord = () => {
    if (currentWord === "") return;
    if (wordList.map((answer) => answer.answer).includes(currentWord))
      setOpen(true);
    else {
      setWordList(wordList.concat(constructAnswer(currentWord)));
    }
    setCurrentWord("");
    if (textInput.current) textInput.current.focus();
  };

  function onTimerEnded() {
    submitWord();
    const newState = { ...state, autAnswers: wordListRef.current };
    setState(newState);
    window.localStorage.setItem("surveyState", JSON.stringify(newState));
    setTestState(TestState.after);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime !== null) {
        setSeconds(autLength - (Date.now() - startTime));
      }
      if (startTime && seconds <= 0) {
        setStartTime(null);
        clearInterval(interval);
        onTimerEnded();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [startTime, seconds, setSeconds]);

  function startCountdown() {
    setStartTime(Date.now());
  }

  function startTask() {
    setTestState(TestState.during);
    startCountdown();
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentWord(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") submitWord();
  };

  function showIntro() {
    return (
      <div className={"formContainer"}>
        <p>
          For this task, you will be asked to come up with as many original uses
          as you can for an object, such as a paper clip. The goal is to come up
          with ideas that strike people as clever, unusual, interesting,
          uncommon, humorous, innovative, or different.<br></br>
          <br></br>
          Your ideas do not have to be practical or realistic; they can be silly
          or strange. Try to name as many and as diverse ideas as you can.
          <br></br>
          <br></br>
          The task will take {durationToString(config.duration)}.<br></br>
          <br></br>
          <b>Example:</b> An uncommon use for a paperclip would be
          &quot;earring&quot;.
        </p>
        <Button
          variant="contained"
          color="primary"
          onClick={startTask}
          className="startButton"
        >
          Start
        </Button>
      </div>
    );
  }

  function showTest() {
    return (
      <div className={"formContainer"}>
        <p>
          {" "}
          Name as many original uses for a <b>{config.object}</b> as you can.
          <br></br>
          Please press or click ENTER after each idea.{" "}
        </p>
        <h2
          style={{ color: seconds <= 10 ? "crimson" : "black", marginTop: "0" }}
        >
          {timerString(seconds)}
        </h2>
        <TextField
          variant="outlined"
          onKeyDown={handleKeyDown}
          inputRef={textInput}
          onChange={handleChange}
          value={currentWord}
        ></TextField>
        <Button
          variant="contained"
          onClick={submitWord}
          style={{ marginTop: "16px" }}
        >
          Enter
        </Button>
        <ul>
          {wordList.map((item) => (
            <li key={item.answer}>{item.answer}</li>
          ))}
        </ul>
      </div>
    );
  }

  function showEnd() {
    if (state.autAnswers === null) return null;
    const enoughAnswers = state.autAnswers.length >= 2;

    const error =
      state.autAnswers.filter((answer) => answer.selected).length !== 2;

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      if (!enoughAnswers || state.autAnswers === null) return;
      setState({
        ...state,
        autAnswers: [
          ...state.autAnswers.slice(0, index),
          {
            ...state.autAnswers[index],
            selected: event.target.checked,
          },
          ...state.autAnswers.slice(index + 1),
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
              {state.autAnswers.map((answer: AUTAnswer, index: number) => {
                return (
                  <FormControlLabel
                    key={answer.answer}
                    control={
                      <Checkbox
                        checked={answer.selected ?? false}
                        onChange={(event) => handleChange(event, index)}
                        name={answer.answer}
                      />
                    }
                    label={answer.answer}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        )}

        <Button
          variant="contained"
          color="primary"
          disabled={enoughAnswers && error && config.selectBestIdeas}
          className={"submitButton"}
          onClick={advance}
        >
          Next
        </Button>
      </div>
    );
  }

  function content() {
    switch (testState) {
      case TestState.before: {
        return showIntro();
      }
      case TestState.during: {
        return showTest();
      }
      case TestState.after: {
        return showEnd();
      }
      default: {
        return showIntro();
      }
    }
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h1>Survey - Association Game</h1>
      {content()}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          elevation={6}
          onClose={handleClose}
          severity="warning"
          variant="filled"
        >
          Suggestion already made
        </MuiAlert>
      </Snackbar>
    </>
  );
}
