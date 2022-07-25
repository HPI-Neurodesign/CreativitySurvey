import { isSurveyConfig, SurveyConfig } from "../data/surveyConfig";

export function timerString(timeInMilliSeconds: number): string {
  const timeInSeconds = Math.round(timeInMilliSeconds / 1000);
  return (
    String(Math.floor(timeInSeconds / 60)).padStart(2, "0") +
    ":" +
    String(timeInSeconds % 60).padStart(2, "0")
  );
}

export function durationToString(duration: number): string {
  return `${Math.floor(duration / 60)} minutes${
    duration % 60 !== 0
      ? ` and ${String(duration % 60).padStart(2, "0")} seconds`
      : ""
  }`;
}

export enum TestState {
  before,
  during,
  after,
}

export async function getConfigFromUrl(url: string): Promise<SurveyConfig> {
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.search);
  if (params.get("config")) {
    const encodedConfig = params.get("config")!;
    const config = JSON.parse(atob(encodedConfig));

    const validationResult = isSurveyConfig.safeParse(config);
    if (validationResult.success) {
      return validationResult.data;
    }
    throw new Error(
      "An error occurred while parsing the config: " +
        validationResult.error.message
    );
  } else if (params.get("loadConfig")) {
    const url = atob(params.get("loadConfig")!);
    const config = await fetch(url).then((response) => response.json());

    const validationResult = isSurveyConfig.safeParse(config);
    if (validationResult.success) {
      return validationResult.data;
    }
    throw new Error(
      "An error occurred while parsing the config: " +
        validationResult.error.message
    );
  } else {
    throw new Error(
      "No config provided. A Survey config must be provided using the config or loadConfig parameters."
    );
  }
}
