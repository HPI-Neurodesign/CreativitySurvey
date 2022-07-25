import React, { useEffect, useState } from "react";
import { SurveyState } from "./data/surveyState";
import { SurveyConfig } from "./data/surveyConfig";
import { isInTestMode } from "./Welcome";

export function EndScreen({
  state,
  config,
}: {
  state: SurveyState;
  config: SurveyConfig;
}) {
  const [dataSent, setDataSent] = useState(false);

  function sendDataToServer() {
    setDataSent(true);
    const http = new XMLHttpRequest();
    http.open("POST", config.dataUrl);
    http.setRequestHeader("Content-type", "application/json");
    const data = JSON.stringify(state, (_, obj) => {
      for (const property in obj) {
        if (
          obj[property] === null ||
          (Array.isArray(obj[property]) && obj[property].length === 0)
        ) {
          delete obj[property];
        }
      }
      return obj;
    });
    http.send(JSON.stringify(data));
  }

  useEffect(() => {
    if (isInTestMode || dataSent) return;
    window.localStorage.setItem("surveyState", JSON.stringify(state));
    sendDataToServer();
  }, [dataSent]);

  return (
    <div className="formContainer">
      <h1>Congratulations!</h1>
      <p>
        You have reached the end of the survey, thank you for taking part in
        this study.
      </p>
      {config.mturk && (
        <>
          <p>
            In order to receive your payment, please copy the code displayed
            below in MTurk:
          </p>
          <h4>{state.id}</h4>
        </>
      )}
    </div>
  );
}
