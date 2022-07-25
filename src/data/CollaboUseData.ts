export interface CollaboUseSuggestion {
  title: string;
  items: CollaboUseSuggestionItem[];
  id: string;
  selected: boolean | null;
}

export interface CollaboUseSuggestionItem {
  item: null | string;
  id: string;
}
