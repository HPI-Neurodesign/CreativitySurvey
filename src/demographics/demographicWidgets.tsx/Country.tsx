import { FormControl, FormLabel, Select, MenuItem } from "@mui/material";
import React, { useMemo } from "react";
import countryList from "react-select-country-list";
import { SurveyState } from "../../data/surveyState";

export function Country({
  state,
  updateState,
}: {
  state: SurveyState;
  updateState: (state: SurveyState) => void;
}) {
  const countryOptions = useMemo(() => countryList().getData(), []);
  const changeHandler = (event: { target: { value: string } }) => {
    updateState({
      ...state,
      demographics: {
        ...state.demographics,
        country: event.target.value,
      },
    });
  };

  return (
    <FormControl component="fieldset" className="formControl demographics">
      <FormLabel component="legend">Where did you grow up?</FormLabel>
      <Select
        value={state.demographics.country ?? ""}
        onChange={changeHandler}
        displayEmpty
        label="Please choose a country"
      >
        {[
          <MenuItem key={""} value={""}>
            <em>Please select a country</em>
          </MenuItem>,
          ...countryOptions.map((country) => (
            <MenuItem key={country.value} value={country.value}>
              {country.label}
            </MenuItem>
          )),
        ]}
      </Select>
    </FormControl>
  );
}
