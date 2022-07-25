import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { getConfigFromUrl } from "./utils/utils";
import { SurveyConfig } from "./data/surveyConfig";

ReactDOM.render(
  <React.StrictMode>
    <Content />
  </React.StrictMode>,
  document.getElementById("root")
);

function Content() {
  const [error, setError] = useState("");
  const [config, setConfig] = useState(null as SurveyConfig | null);

  useEffect(() => {
    getConfigFromUrl(window.location.href)
      .then((config) => {
        setConfig(config);
      })
      .catch((error) => {
        setError((error as Error).message);
      });
  });

  return (
    <>
      {config && <App config={config} />}
      {error && (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>An error occurred while loading the survey</h1>
          <p>
            <span style={{ color: "darkred" }}>{error}</span>
          </p>
          <p>Make sure you copy the complete link.</p>
        </div>
      )}
    </>
  );
}
