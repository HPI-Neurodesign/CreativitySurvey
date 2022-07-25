export const gameGenres = {
  rpg: "Role Playing Games Games",
  sports: "Sports Games",
  action: "Action Games",
  strategy: "Strategy Games",
  td: "Tower Defense Games",
  other: "Other",
};

export const gamePlatforms = {
  mobile: "Mobile Phone / Tablet",
  console: "Console",
  pc: "PC",
};

export interface GamePlatforms {
  mobile: number | null;
  console: number | null;
  pc: number | null;
}

export interface GameExperienceGenres {
  rpg: number | null;
  sports: number | null;
  action: number | null;
  strategy: number | null;
  td: number | null;
  other: number | null;
}
