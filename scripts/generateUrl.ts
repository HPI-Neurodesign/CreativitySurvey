import { SurveyConfig } from "../src/data/surveyConfig";

export function encodeConfig(config: SurveyConfig, url = "localhost:3000") {
  const encodedConfig = btoa(JSON.stringify(config));
  return `${url}?config=${encodedConfig}`;
}
