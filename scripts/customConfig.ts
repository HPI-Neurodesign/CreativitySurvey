import { SurveyConfig } from "../src/data/surveyConfig";

export const collaboConfig: SurveyConfig = {
  dataUrl: "https://survey.corinnaj.me/upload.php",
  title: "Immune Defense Survey",
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
      title: "Immune Defense Game",
      assessFlowAfterwards: true,
      externalUrl: "https://immunedefense.corinnaj.me?id=",
      code: "GUTFDBSVAAZ",
      description:
        "Play the game until you reach the end screen, this will take about 5 minutes.",
      imagePath: "",
    },
    {
      type: "externalSite",
      title: "Shapes Game",
      assessFlowAfterwards: true,
      externalUrl:
        "https://shapes.corinnaj.me/?showResults=false&allowEarlyExit=false&userId=",
      code: "HVUGECTWBBA-",
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
        items: ["apple", "hat"],
      },
    },
    { type: "creativeAchievements" },
    {
      type: "demographics",
      age: true,
      gender: true,
      englishProficiency: true,
      country: true,
      education: true,
      training: true,
    },
    { type: "videoGameExperience" },
    {
      type: "bigFive",
      includeIncomeQuestions: true,
    },
  ],
};
