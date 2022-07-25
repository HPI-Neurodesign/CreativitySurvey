export class FlowAnswer {
  boringness: number | null;
  timePassing: number | null;
  difficulty: number | null;
  parallel: number | null;
  absorbing: number | null;

  constructor() {
    this.boringness = null;
    this.timePassing = null;
    this.difficulty = null;
    this.parallel = null;
    this.absorbing = null;
  }
}

export const flowQuestions = {
  boringness: "The task was really boring.",
  timePassing: "While working on the task, time passed quickly for me.",
  difficulty: "It was difficult for me to master this task.",
  parallel: "I felt tempted to do something else in parallel.",
  absorbing:
    "The task was so absorbing, I forgot about my real-world environment.",
};
