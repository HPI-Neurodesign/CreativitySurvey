import { BigFiveData } from "./BigFiveData";
import { CollaboUseSuggestion } from "./CollaboUseData";
import { CreativeCategories, CAF } from "./CreativeAchievementsData";
import { TrainingOptions } from "./DemographicsData";
import { FlowAnswer } from "./FlowQuestionsData";
import { GameExperienceGenres, GamePlatforms } from "./GamesExperienceData";

export interface SurveyState {
  id?: string;

  demographics: {
    age: number | null;
    gender: number | null;
    education: number | null;
    englishProficiency: number | null;
    country: string | null;
    training: TrainingOptions | null;
  };

  gameExperience: {
    experience: number | null;
    genres: GameExperienceGenres;
    platforms: GamePlatforms;
  } | null;

  externalPages: ExternalPages[];

  autAnswers: AUTAnswer[] | null;
  collaboUseResult: CollaboUseSuggestion[] | null;

  creativityTestExperience: string | null;

  bigFive: BigFiveData | null;

  creativeAchievements: {
    categories: CreativeCategories;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    achievements: Record<string, any[]>;
    additionalCA: string;
    features: CAF;
  } | null;

  attentionItems: boolean[];
}

export interface AUTAnswer {
  answer: string;
  secondsExpired: number;
  selected: boolean | null;
}

export interface ExternalPages {
  flow: FlowAnswer | null;
  code: string | null;
}
