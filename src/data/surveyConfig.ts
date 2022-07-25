import { assert, IsExact } from "conditional-type-checks";
import { IterableElement } from "type-fest";
import * as z from "zod";

//See Readme.md for more information on how to configure the survey
export interface SurveyConfig {
  dataUrl: string;
  frontPage: string; // Markdown
  title: string;
  mturk?: {
    rewardAmount: number;
    rewardCurrency: string;
  };
  pages: Array<
    | {
        type: "AUT";
        duration: number; //in seconds
        object: string;
        selectBestIdeas: boolean;
      }
    | {
        type: "collaboUse";
        prompt: string;
        items: string[];
        duration: number; //in seconds
        selectBestIdeas: boolean;
        example?: {
          items: string[];
          idea: string;
        };
      }
    | {
        type: "creativeAchievements";
      }
    | {
        type: "bigFive";
        includeIncomeQuestions: boolean;
      }
    | {
        type: "externalSite";
        title: string;
        assessFlowAfterwards?: {
          includeAttentionItem: boolean;
        };
        externalUrl: string;
        code: string;
        description: string;
        imagePath: string;
        additionalUrlParameters?: {
          parameter: string;
          value: string;
        }[];
      }
    | {
        type: "videoGameExperience";
      }
    | {
        type: "demographics";
        age?: boolean;
        gender?: boolean;
        englishProficiency?: boolean;
        country?: boolean;
        training?: boolean;
        education?: boolean;
        includeAttentionItem?: boolean;
      }
    | {
        type: "creativityTestExperience";
      }
  >;
}

export type ConfigPages = SurveyConfig["pages"];

export interface CollaboConfig
  extends Extract<
    IterableElement<SurveyConfig["pages"]>,
    { type: "collaboUse" }
  > {}

export interface DemographicsConfig
  extends Extract<
    IterableElement<SurveyConfig["pages"]>,
    { type: "demographics" }
  > {}

export interface ExternalSiteConfig
  extends Extract<
    IterableElement<SurveyConfig["pages"]>,
    { type: "externalSite" }
  > {}

export interface BigFiveConfig
  extends Extract<
    IterableElement<SurveyConfig["pages"]>,
    { type: "bigFive" }
  > {}

export interface AUTConfig
  extends Extract<IterableElement<SurveyConfig["pages"]>, { type: "AUT" }> {}

export const isSurveyConfig = z.strictObject({
  dataUrl: z.string(),
  frontPage: z.string(),
  title: z.string(),
  mturk: z.optional(
    z.strictObject({
      rewardAmount: z.number(),
      rewardCurrency: z.string(),
    })
  ),
  pages: z.array(
    z.union([
      z.strictObject({
        type: z.literal("AUT"),
        duration: z.number(),
        object: z.string(),
        selectBestIdeas: z.boolean(),
      }),
      z.strictObject({
        type: z.literal("collaboUse"),
        prompt: z.string(),
        items: z.array(z.string()),
        duration: z.number(),
        selectBestIdeas: z.boolean(),
        example: z.optional(
          z.strictObject({
            items: z.array(z.string()),
            idea: z.string(),
          })
        ),
      }),
      z.strictObject({
        type: z.literal("creativeAchievements"),
      }),
      z.strictObject({
        type: z.literal("bigFive"),
        includeIncomeQuestions: z.boolean(),
      }),
      z.strictObject({
        type: z.literal("externalSite"),
        title: z.string(),
        assessFlowAfterwards: z.optional(
          z.strictObject({
            includeAttentionItem: z.boolean(),
          })
        ),
        externalUrl: z.string(),
        code: z.string(),
        description: z.string(),
        imagePath: z.string(),
        additionalUrlParameters: z.optional(
          z.array(
            z.strictObject({
              parameter: z.string(),
              value: z.string(),
            })
          )
        ),
      }),
      z.strictObject({
        type: z.literal("videoGameExperience"),
      }),
      z.strictObject({
        type: z.literal("demographics"),
        age: z.optional(z.boolean()),
        training: z.optional(z.boolean()),
        education: z.optional(z.boolean()),
        country: z.optional(z.boolean()),
        gender: z.optional(z.boolean()),
        englishProficiency: z.optional(z.boolean()),
        includeAttentionItem: z.optional(z.boolean()),
      }),
      z.strictObject({
        type: z.literal("creativityTestExperience"),
      }),
    ])
  ),
});

// Make sure that the schema really matches the SurveyConfig type.
assert<IsExact<z.infer<typeof isSurveyConfig>, SurveyConfig>>(true);
