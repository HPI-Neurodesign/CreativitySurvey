export const creativeAchievementsData: { [category: string]: string[] } = {
  "Visual Arts": [
    "I have no training or recognized talent in this area. (Click Next)",
    "I have taken lessons in this area.",
    "People have commented on my talent in this area.",
    "I have won a prize or prizes at a juried art show.",
    "I have had a showing of my work in a gallery.",
    "I have sold a piece of my work.",
    "My work has been critiqued in local publications.",
    "*My work has been critiqued in national publications.",
  ],
  Music: [
    "I have no training or recognized talent in this area (Click Next).",
    "I play one or more musical instruments proficiently.",
    "I have played with a recognized orchestra or band.",
    "I have composed an original piece of music.",
    "My musical talent has been critiqued in a local publication.",
    "My composition has been recorded.",
    "Recordings of my composition have been sold publicly.",
    "*My compositions have been critiqued in a national publication.",
  ],
  Dance: [
    "I have no training or recognized talent in this area (Click Next)",
    "I have danced with a recognized dance company.",
    "I have choreographed an original dance number.",
    "My choreography has been performed publicly.",
    "My dance abilities have been critiqued in a local publication.",
    "I have choreographed dance professionally.",
    "My choreography has been recognized by a local publication.",
    "*My choreography has been recognized by a national publication.",
  ],
  "Architectural Design": [
    "I do not have training or recognized talent in this area. (Click Next)",
    "I have designed an original structure.",
    "A structure designed by me has been constructed.",
    "I have sold an original architectural design.",
    "A structure that I have designed and sold has been built professionally.",
    "My architectural design has won an award or awards.",
    "My architectural design has been recognized in a local publication.",
    "*My architectural design has been recognized in a national publication.",
  ],
  "Creative Writing": [
    "I do not have training or recognized talent in this area (Click Next).",
    "I have written an original short work (poem or short story).",
    "My work has won an award or prize.",
    "I have written an original long work (epic, novel, or play).",
    "I have sold my work to a publisher.",
    "My work has been printed and sold publicly.",
    "My work has been reviewed in local publications.",
    "*My work has been reviewed in national publications.",
  ],
  Humor: [
    "I do not have recognized talent in this area (Click Next).",
    "People have often commented on my original sense of humor.",
    "I have created jokes that are now regularly repeated by others.",
    "I have written jokes for other people.",
    "I have written a joke or cartoon that has been published.",
    "I have worked as a professional comedian.",
    "I have worked as a professional comedy writer.",
    "My humor has been recognized in a national publication.",
  ],
  Inventions: [
    "I do not have recognized talent in this area.",
    "I regularly find novel uses for household objects.",
    "I have sketched out an invention and worked on its design flaws.",
    "I have created original software for a computer.",
    "I have built a prototype of one of my designed inventions.",
    "I have sold one of my inventions to people I know.",
    "*I have received a patent for one of my inventions.",
    "*I have sold one of my inventions to a manufacturing firm.",
  ],
  "Scientific Discovery": [
    "I do not have training or recognized ability in this field (Click Next).",
    "I often think about ways that scientific problems could be solved.",
    "I have won a prize at a science fair or other local competition.",
    "I have received a scholarship based on my work in science or medicine.",
    "I have been author or coauthor of a study published in a scientific journal.",
    "*I have won a national prize in the field of science or medicine.",
    "*I have received a grant to pursue my work in science or medicine.",
    "My work has been cited by other scientists in national publications.",
  ],
  "Theater and Film": [
    "I do not have training or recognized ability in this field.",
    "I have performed in theater or film.",
    "My acting abilities have been recognized in a local publication.",
    "I have directed or produced a theater or film production.",
    "I have won an award or prize for acting in theater or film.",
    "I have been paid to act in theater or film.",
    "I have been paid to direct a theater or film production.",
    "*My theatrical work has been recognized in a national publication.",
  ],
  "Culinary Arts": [
    "I do not have training or experience in this field.",
    "I often experiment with recipes.",
    "My recipes have been published in a local cookbook.",
    "My recipes have been used in restaurants or other public venues.",
    "I have been asked to prepare food for celebrities or dignitaries.",
    "My recipes have won a prize or award.",
    "I have received a degree in culinary arts.",
    "*My recipes have been published nationally.",
  ],
};

export const categoryOrder = [
  "Visual Arts",
  "Music",
  "Dance",
  "Architectural Design",
  "Creative Writing",
  "Humor",
  "Inventions",
  "Scientific Discovery",
  "Theater and Film",
  "Culinary Arts",
];

export const shortCategoryNames: CategoryNames = {
  "Visual Arts": "arts",
  Music: "music",
  Dance: "dance",
  "Architectural Design": "architecture",
  "Creative Writing": "writing",
  Humor: "humor",
  Inventions: "invention",
  "Scientific Discovery": "science",
  "Theater and Film": "theatre",
  "Culinary Arts": "cooking",
};

export interface CategoryNames {
  "Visual Arts": string;
  Music: string;
  Dance: string;
  "Architectural Design": string;
  "Creative Writing": string;
  Humor: string;
  Inventions: string;
  "Scientific Discovery": string;
  "Theater and Film": string;
  "Culinary Arts": string;
}

export interface CreativeCategories {
  art: boolean;
  music: boolean;
  dance: boolean;
  soloSports: boolean;
  teamSports: boolean;
  architecture: boolean;
  business: boolean;
  writing: boolean;
  humor: boolean;
  inventions: boolean;
  science: boolean;
  theatre: boolean;
  culinary: boolean;
}

export const creativeCategories = {
  art: "Visual arts (painting, sculpture)",
  music: "Music",
  dance: "Dance",
  soloSports: "Individual sports (tennis, golf)",
  teamSports: "Team sports",
  architecture: "Architectural design",
  business: "Entrepreneurial ventures",
  writing: "Creative writing",
  humor: "Humor",
  inventions: "Inventions",
  science: "Scientific inquiry",
  theatre: "Theater and film",
  culinary: "Culinary arts",
};

export interface CAF {
  creativeAbility: boolean;
  artistic: boolean;
  professor: boolean;
}
