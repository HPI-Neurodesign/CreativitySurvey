import { SurveyConfig } from "../src/data/surveyConfig";

// This is a sample config, you can adapt this to your needs to create your own survey.

export const exampleConfig: SurveyConfig = {
  dataUrl: "https://test.com/dataUpload",
  title: "Test Survey",
  frontPage: `This survey consists of several small games and questionnaires. All in all it should take you between 30 and 40 minutes to complete. The table below gives an estimate of the time required for each part of the study.

  | Activity | Duration | 
  |----|---------|
  | Game 1 | about 6 minutes | 
  | Association Games | about 7 minutes |
  | Questionnaires | about 17 minutes |
  
  All data collected during this survey will be stored in an anonymized format on our server. The data is used for research purposes and scientific publications.
        
  We recommend completing this survey on a laptop or desktop computer, using a mouse. Playing the games on a tablet will not work, and you will not receive the reward at the end. One game includes sound, please turn on your loudspeakers.`,
  mturk: {
    rewardAmount: 5,
    rewardCurrency: "$",
  },
  pages: [
    {
      type: "externalSite",
      title: "An External Game",
      assessFlowAfterwards: true,
      externalUrl: "https://test.com?id=",
      code: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      description:
        "Play the game until you reach the end screen, this will take about 5 minutes.",
      imagePath: "",
    },
    {
      type: "externalSite",
      title: "Another External Test",
      assessFlowAfterwards: true,
      externalUrl: "https://anothertest.com?id=",
      code: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      description:
        "Play the game continuously until you reach the end screen, this will take about 13 minutes.",
      imagePath: "",
    },
    {
      type: "AUT",
      duration: 120,
      object: "brick",
      selectBestIdeas: true,
    },
    {
      type: "collaboUse",
      prompt: "entertaining games for a group of friends",
      items: [
        "Apple",
        "Hammer",
        "Jacket",
        "Hat",
        "Ring",
        "Table",
        "Rope",
        "Ketchup",
        "Needle",
        "Mirror",
      ],
      duration: 180,
      selectBestIdeas: true,
      example: {
        idea: 'Throw "ball" into hat',
        items: ["Apple", "Hat"],
      },
    },
    { type: "creativeAchievements" },
    {
      type: "demographics",
      age: true,
      gender: true,
      englishProficiency: true,
      country: true,
      training: true,
      education: true,
    },
    { type: "videoGameExperience" },
    { type: "bigFive", includeIncomeQuestions: true },
  ],
};

//This is a link to try this sample config
const enodedSurveyConfig =
  "http://localhost:3000/?config=eyJkYXRhVXJsIjoiaHR0cHM6Ly90ZXN0LmNvbS9kYXRhVXBsb2FkIiwidGl0bGUiOiJUZXN0IFN1cnZleSIsImZyb250UGFnZSI6IlRoaXMgc3VydmV5IGNvbnNpc3RzIG9mIHNldmVyYWwgc21hbGwgZ2FtZXMgYW5kIHF1ZXN0aW9ubmFpcmVzLiBBbGwgaW4gYWxsIGl0IHNob3VsZCB0YWtlIHlvdSBiZXR3ZWVuIDMwIGFuZCA0MCBtaW51dGVzIHRvIGNvbXBsZXRlLiBUaGUgdGFibGUgYmVsb3cgZ2l2ZXMgYW4gZXN0aW1hdGUgb2YgdGhlIHRpbWUgcmVxdWlyZWQgZm9yIGVhY2ggcGFydCBvZiB0aGUgc3R1ZHkuXG5cbiAgfCBBY3Rpdml0eSB8IER1cmF0aW9uIHwgXG4gIHwtLS0tfC0tLS0tLS0tLXxcbiAgfCBHYW1lIDEgfCBhYm91dCA2IG1pbnV0ZXMgfCBcbiAgfCBBc3NvY2lhdGlvbiBHYW1lcyB8IGFib3V0IDcgbWludXRlcyB8XG4gIHwgUXVlc3Rpb25uYWlyZXMgfCBhYm91dCAxNyBtaW51dGVzIHxcbiAgXG4gIEFsbCBkYXRhIGNvbGxlY3RlZCBkdXJpbmcgdGhpcyBzdXJ2ZXkgd2lsbCBiZSBzdG9yZWQgaW4gYW4gYW5vbnltaXplZCBmb3JtYXQgb24gb3VyIHNlcnZlci4gVGhlIGRhdGEgaXMgdXNlZCBmb3IgcmVzZWFyY2ggcHVycG9zZXMgYW5kIHNjaWVudGlmaWMgcHVibGljYXRpb25zLlxuICAgICAgICBcbiAgV2UgcmVjb21tZW5kIGNvbXBsZXRpbmcgdGhpcyBzdXJ2ZXkgb24gYSBsYXB0b3Agb3IgZGVza3RvcCBjb21wdXRlciwgdXNpbmcgYSBtb3VzZS4gUGxheWluZyB0aGUgZ2FtZXMgb24gYSB0YWJsZXQgd2lsbCBub3Qgd29yaywgYW5kIHlvdSB3aWxsIG5vdCByZWNlaXZlIHRoZSByZXdhcmQgYXQgdGhlIGVuZC4gT25lIGdhbWUgaW5jbHVkZXMgc291bmQsIHBsZWFzZSB0dXJuIG9uIHlvdXIgbG91ZHNwZWFrZXJzLiIsIm10dXJrIjp7InJld2FyZEFtb3VudCI6NSwicmV3YXJkQ3VycmVuY3kiOiIkIn0sInBhZ2VzIjpbeyJ0eXBlIjoiZXh0ZXJuYWxTaXRlIiwidGl0bGUiOiJBbiBFeHRlcm5hbCBHYW1lIiwiYXNzZXNzRmxvd0FmdGVyd2FyZHMiOnRydWUsImV4dGVybmFsVXJsIjoiaHR0cHM6Ly90ZXN0LmNvbT9pZD0iLCJjb2RlIjoiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVoiLCJkZXNjcmlwdGlvbiI6IlBsYXkgdGhlIGdhbWUgdW50aWwgeW91IHJlYWNoIHRoZSBlbmQgc2NyZWVuLCB0aGlzIHdpbGwgdGFrZSBhYm91dCA1IG1pbnV0ZXMuIiwiaW1hZ2VQYXRoIjoiIn0seyJ0eXBlIjoiZXh0ZXJuYWxTaXRlIiwidGl0bGUiOiJBbm90aGVyIEV4dGVybmFsIFRlc3QiLCJhc3Nlc3NGbG93QWZ0ZXJ3YXJkcyI6dHJ1ZSwiZXh0ZXJuYWxVcmwiOiJodHRwczovL2Fub3RoZXJ0ZXN0LmNvbT9pZD0iLCJjb2RlIjoiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVoiLCJkZXNjcmlwdGlvbiI6IlBsYXkgdGhlIGdhbWUgY29udGludW91c2x5IHVudGlsIHlvdSByZWFjaCB0aGUgZW5kIHNjcmVlbiwgdGhpcyB3aWxsIHRha2UgYWJvdXQgMTMgbWludXRlcy4iLCJpbWFnZVBhdGgiOiIifSx7InR5cGUiOiJBVVQiLCJkdXJhdGlvbiI6MTIwLCJvYmplY3QiOiJicmljayIsInNlbGVjdEJlc3RJZGVhcyI6dHJ1ZX0seyJ0eXBlIjoiY29sbGFib1VzZSIsInByb21wdCI6ImVudGVydGFpbmluZyBnYW1lcyBmb3IgYSBncm91cCBvZiBmcmllbmRzIiwiaXRlbXMiOlsiQXBwbGUiLCJIYW1tZXIiLCJKYWNrZXQiLCJIYXQiLCJSaW5nIiwiVGFibGUiLCJSb3BlIiwiS2V0Y2h1cCIsIk5lZWRsZSIsIk1pcnJvciJdLCJkdXJhdGlvbiI6MTgwLCJzZWxlY3RCZXN0SWRlYXMiOnRydWUsImV4YW1wbGUiOnsiaWRlYSI6IlRocm93IFwiYmFsbFwiIGludG8gaGF0IiwiaXRlbXMiOlsiQXBwbGUiLCJIYXQiXX19LHsidHlwZSI6ImNyZWF0aXZlQWNoaWV2ZW1lbnRzIn0seyJ0eXBlIjoiZGVtb2dyYXBoaWNzIiwiYWdlIjp0cnVlLCJnZW5kZXIiOnRydWUsImVuZ2xpc2hQcm9maWNpZW5jeSI6dHJ1ZSwiY291bnRyeSI6dHJ1ZSwidHJhaW5pbmciOnRydWUsImVkdWNhdGlvbiI6dHJ1ZX0seyJ0eXBlIjoidmlkZW9HYW1lRXhwZXJpZW5jZSJ9LHsidHlwZSI6ImJpZ0ZpdmUiLCJpbmNsdWRlSW5jb21lUXVlc3Rpb25zIjp0cnVlfV19";
