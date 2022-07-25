export enum Trait {
  Openness,
  Conscientiousness,
  Extraversion,
  Agreeableness,
  Neuroticism,
  Income,
}

export interface BigFiveStatement {
  statement: string;
  trait: Trait;
  isStatementNegative?: boolean;
}

export class BigFiveData {
  _1quiet: number | BigFiveStatement | null;
  _2compassionate: number | BigFiveStatement | null;
  _3disorganized: number | BigFiveStatement | null;
  _4worries: number | BigFiveStatement | null;
  _5fascinated: number | BigFiveStatement | null;
  _opportunity: number | BigFiveStatement | null;
  _6dominant: number | BigFiveStatement | null;
  _7rude: number | BigFiveStatement | null;
  _8difficultyStarting: number | BigFiveStatement | null;
  _9depressed: number | BigFiveStatement | null;
  _necessity: number | BigFiveStatement | null;
  _10negAbstractIdeas: number | BigFiveStatement | null;
  _11energy: number | BigFiveStatement | null;
  _12assumesBest: number | BigFiveStatement | null;
  _13reliable: number | BigFiveStatement | null;
  _regular: number | BigFiveStatement | null;
  _14stable: number | BigFiveStatement | null;
  _15original: number | BigFiveStatement | null;

  constructor() {
    this._1quiet = null;
    this._2compassionate = null;
    this._3disorganized = null;
    this._4worries = null;
    this._5fascinated = null;
    this._opportunity = null;
    this._6dominant = null;
    this._7rude = null;
    this._8difficultyStarting = null;
    this._9depressed = null;
    this._10negAbstractIdeas = null;
    this._regular = null;
    this._11energy = null;
    this._12assumesBest = null;
    this._13reliable = null;
    this._14stable = null;
    this._15original = null;
    this._necessity = null;
  }
}

export const bigFiveQuestions: BigFiveData = {
  _1quiet: {
    statement: "who tends to be quiet.",
    trait: Trait.Extraversion,
    isStatementNegative: true,
  },
  _2compassionate: {
    statement: "who is compassionate, has a soft heart.",
    trait: Trait.Agreeableness,
  },
  _3disorganized: {
    statement: "who tends to be disorganized.",
    trait: Trait.Conscientiousness,
    isStatementNegative: true,
  },
  _4worries: {
    statement: "who worries a lot.",
    trait: Trait.Neuroticism,
  },
  _5fascinated: {
    statement: "who is fascinated by art, music, or literature.",
    trait: Trait.Openness,
  },
  _opportunity: {
    statement: "who doesn't need to worry about income in my day-to-day life.",
    trait: Trait.Income,
  },
  _6dominant: {
    statement: "who is dominant, acts as a leader.",
    trait: Trait.Extraversion,
  },
  _7rude: {
    statement: " who is sometimes rude to others.",
    trait: Trait.Agreeableness,
    isStatementNegative: true,
  },
  _8difficultyStarting: {
    statement: "who has difficulty getting started on tasks.",
    trait: Trait.Conscientiousness,
    isStatementNegative: true,
  },
  _9depressed: {
    statement: "who tends to feel depressed, blue.",
    trait: Trait.Neuroticism,
  },
  _necessity: {
    statement: "for whom steady hard work does not suffice to get by in life.",
    trait: Trait.Income,
  },
  _10negAbstractIdeas: {
    statement: "who has little interest in abstract ideas.",
    trait: Trait.Openness,
    isStatementNegative: true,
  },
  _11energy: { statement: "who is full of energy.", trait: Trait.Extraversion },
  _12assumesBest: {
    statement: "who assumes the best about people.",
    trait: Trait.Agreeableness,
  },
  _13reliable: {
    statement: "who is reliable, can always be counted on.",
    trait: Trait.Conscientiousness,
  },

  _regular: {
    statement: "who gets by in life through a lot of steady hard work.",
    trait: Trait.Income,
  },
  _14stable: {
    statement: "who is emotionally stable, not easily upset.",
    trait: Trait.Neuroticism,
  },
  _15original: {
    statement: "who is original, comes up with new ideas.",
    trait: Trait.Openness,
  },
};
