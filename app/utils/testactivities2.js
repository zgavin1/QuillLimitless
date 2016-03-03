// The concept portion of the data is just for showing the results, it doesn't save to firebase yet
// or correspond to real data, just make sure you are internally consistent.

// do not set needsFixing to true if the answer is a red herring.

// A red herrring is a question that is grammatically correct and tapping the no
// error button is the correct interaction.

// Text surrounded by [Square brackets] is underlines and is an incorrect answer.
// Text surrounded by {Curly Brackets} is the correct answer. You can ommit this
// if the question is a red herring and has no error.

export default [
  {
    concept: {
      uid: "9",
      name: "Capitalization in Dialogue",
      conceptName: "Capitalization",
      standard: "4.1g. Capitalization",
    },
    needsFixing: true,
    prompt: "The pilot said[,] ”{mechanics} check airplanes [wings’] before they depart.\"",
    answer: "The pilot said[,] ”{Mechanics} check airplanes [wings’] before they depart.\"",
  },
  {
    concept: {
      uid: "10",
      name: "Commas in a list",
      conceptName: "Commas",
      standard: "4.1g. Commas",
    },
    needsFixing: true,
    prompt: "Last summer[,] Richie enjoyed reading {novels drawing comics} and writing articles.",
    answer: "Last summer[,] Richie enjoyed reading {novels, drawing, comics,} and writing articles.",
  },
  {
    concept: {
      uid: "11",
      name: "Verb Tense",
      conceptName: "Verb Tense",
      standard: "4.1g. Verb Tense",
    },
    needsFixing: true,
    prompt: "Last [week], I {take} medicine on the [doctor’s] orders.",
    answer: "Last [week], I {took} medicine on the [doctor’s] orders.",
  },
  {
    concept: {
      uid: "12",
      name: "to too",
      conceptName: "Commonly Confused Words",
      standard: "4.1g. Commonly Confused Words",
    },
    needsFixing: true,
    prompt: "\“While on vacation,\” said Joey, \“I [dug] holes {too} plant my [mother’s] roses.\”",
    answer: "\“While on vacation,\” said Joey, \“I [dug] holes {to} plant my [mother’s] roses.\”",
  },
  {
    concept: {
      uid: "13",
      name: "Plurals for Words ending in Y",
      conceptName: "Plurals",
      standard: "4.1g. Plurals",
    },
    needsFixing: true,
    prompt: "Next year, {factorys}, cars, and people will add 40 billion tons of [carbon dioxide] into the [earth’s] atmosphere.",
    answer: "Next year, {factories}, cars, and people will add 40 billion tons of [carbon dioxide] into the [earth’s] atmosphere.",
  },
]
