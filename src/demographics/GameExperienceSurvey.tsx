import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import "../App.css";
import {
  GameExperienceGenres,
  gameGenres,
  gamePlatforms,
  GamePlatforms,
} from "../data/GamesExperienceData";
import { SurveyState } from "../data/surveyState";

export function GameExperienceSurvey({
  state,
  setState,
  advance,
}: {
  state: SurveyState;
  setState: Dispatch<SetStateAction<SurveyState>>;
  advance: () => void;
}) {
  const [unfilledVariables, setUnfilledVariables] = useState(true);

  useEffect(() => {
    if (state.gameExperience === null) {
      setState({
        ...state,
        gameExperience: {
          experience: null,
          genres: {
            action: null,
            other: null,
            rpg: null,
            sports: null,
            strategy: null,
            td: null,
          } as GameExperienceGenres,
          platforms: {
            console: null,
            mobile: null,
            pc: null,
          } as GamePlatforms,
        },
      });
    }
  });

  const checkUnfilledVariables = (newState: SurveyState) => {
    setUnfilledVariables(
      newState.gameExperience === null ||
        newState.gameExperience.experience === null ||
        Object.values(newState.gameExperience.genres).includes(null) ||
        Object.values(newState.gameExperience.platforms).includes(null)
    );
  };

  const updateState = (newState: SurveyState) => {
    setState(newState);
    checkUnfilledVariables(newState);
  };

  function savePlatform(newValue: number, platform: keyof GamePlatforms) {
    const newState: SurveyState = {
      ...state,
      gameExperience: {
        ...state.gameExperience!,
        platforms: {
          ...state.gameExperience!.platforms,
          [platform]: newValue,
        },
      },
    };
    setState(newState);
    checkUnfilledVariables(newState);
  }

  function saveGenre(newValue: number, genre: keyof GameExperienceGenres) {
    const newState: SurveyState = {
      ...state,
      gameExperience: {
        ...state.gameExperience!,
        genres: {
          ...state.gameExperience!.genres,
          [genre]: newValue,
        },
      },
    };
    setState(newState);
    checkUnfilledVariables(newState);
  }

  function GameGenresRadioButtons(genre: keyof GameExperienceGenres) {
    return (
      <RadioGroup
        row
        aria-label="anonymous"
        name="anonymous"
        value={state.gameExperience?.genres[genre] ?? ""}
        onChange={(event) => saveGenre(parseInt(event.target.value), genre)}
      >
        <FormControlLabel
          value={0}
          control={<Radio />}
          labelPlacement="bottom"
          label="Don't know what this is"
        />
        <FormControlLabel
          value={1}
          control={<Radio />}
          labelPlacement="bottom"
          label="(Hardly) Never"
        />
        <FormControlLabel
          value={2}
          control={<Radio />}
          labelPlacement="bottom"
          label="Seldom"
        />
        <FormControlLabel
          value={3}
          control={<Radio />}
          labelPlacement="bottom"
          label="Often"
        />
        <FormControlLabel
          value={4}
          control={<Radio />}
          labelPlacement="bottom"
          label="Very Often"
        />
      </RadioGroup>
    );
  }

  function GamePlatformsRadioButtons(platform: keyof GamePlatforms) {
    return (
      <RadioGroup
        row
        aria-label="anonymous"
        name="anonymous"
        value={state.gameExperience?.platforms[platform] ?? ""}
        onChange={(event) =>
          savePlatform(parseInt(event.target.value), platform)
        }
      >
        <FormControlLabel
          value={0}
          control={<Radio />}
          labelPlacement="bottom"
          label="(Hardly) Never"
        />
        <FormControlLabel
          value={1}
          control={<Radio />}
          labelPlacement="bottom"
          label="Seldom"
        />
        <FormControlLabel
          value={2}
          control={<Radio />}
          labelPlacement="bottom"
          label="Often"
        />
        <FormControlLabel
          value={3}
          control={<Radio />}
          labelPlacement="bottom"
          label="Very Often"
        />
      </RadioGroup>
    );
  }

  return (
    <div className={"formContainer"}>
      <h1>Survey - Game Experience</h1>

      <FormControl component="fieldset" className={"formControl"}>
        <FormLabel component="legend">
          How much experience do you have playing video/computer games?
        </FormLabel>
        <RadioGroup
          aria-label="game_experience"
          name="game_experience"
          value={state.gameExperience?.experience ?? ""}
          onChange={(event) =>
            updateState({
              ...state,
              gameExperience: {
                ...state.gameExperience!,
                experience: parseInt(event.target.value),
              },
            })
          }
        >
          <FormControlLabel
            value={0}
            control={<Radio />}
            label="I have basically never played such games in my life."
          />
          <FormControlLabel
            value={1}
            control={<Radio />}
            label="I don’t play anymore, but in the past I used to play such games sometimes (on average less than 10 days per month)."
          />
          <FormControlLabel
            value={2}
            control={<Radio />}
            label="I don’t play anymore, but in the past I used to play such games often (on average 10 + days per month, but not daily)."
          />
          <FormControlLabel
            value={3}
            control={<Radio />}
            label="I don’t play anymore, but I used to play such games (almost) daily."
          />
          <FormControlLabel
            value={4}
            control={<Radio />}
            label="I sometimes play such games (less than 10 days per month on average)."
          />
          <FormControlLabel
            value={5}
            control={<Radio />}
            label="I often play such games (10 + days per month on average, but not daily)."
          />
          <FormControlLabel
            value={6}
            control={<Radio />}
            label="I play such games (almost) daily."
          />
        </RadioGroup>
      </FormControl>

      <p style={{ marginBottom: "0px", marginTop: "70px" }}>
        If you have played video/computer games before, how often have you
        played the following genres?
      </p>
      {Object.keys(gameGenres).map((genre: string, index: number) => (
        <div
          key={index}
          className={index % 2 === 1 ? "highlightGrey" : "highlightWhite"}
        >
          <p style={{ marginTop: "20px" }}></p>
          <b>{gameGenres[genre as keyof GameExperienceGenres]}</b>
          {GameGenresRadioButtons(genre as keyof GameExperienceGenres)}
        </div>
      ))}

      <br></br>

      <p style={{ marginBottom: "0px", marginTop: "70px" }}>
        If you have played video/computer games before, how often have you used
        the following platforms?
      </p>
      {Object.keys(gamePlatforms).map((platform: string, index: number) => (
        <div
          key={index}
          className={index % 2 === 1 ? "highlightGrey" : "highlightWhite"}
        >
          <p style={{ marginTop: "20px" }}></p>
          <b>{gamePlatforms[platform as keyof GamePlatforms]}</b>
          {GamePlatformsRadioButtons(platform as keyof GamePlatforms)}
        </div>
      ))}

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
        className="submitButton formControl"
        disabled={unfilledVariables}
      >
        Next
      </Button>
    </div>
  );
}
