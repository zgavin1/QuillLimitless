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
      uid: "3",
      name: "Quotation Marks for Dialogue",
      conceptName: "Quotation Marks",
      standard: "4.1g. Quotation",
    },
    needsFixing: true,
    prompt: "\"[Then],\" my friend said, \"what do you want to do after this{.}\"",
    answer: "\"[Then],\" my friend said, \"what do you want to do after this{?}\"",
  },
  {
    concept: {
      uid: "4",
      name: "Question Marks in Dialogue",
      conceptName: "Question Marks",
      standard: "4.1g. Question Marks",
    },
    needsFixing: true,
    prompt: "\"[Where] would you want to go{,}\" asked [Sarah].",
    answer: "\"[Where] would you want to go{?}\" asked [Sarah].",
  },
  {
    concept: {
      uid: "5",
      name: "Apostrophes",
      conceptName: "Apostrophes",
      standard: "4.1g. Apostrophes",
    },
    needsFixing: true,
    prompt: "{Ellens} phone [won't] stop ringing[.]",
    answer: "{Ellen's} phone [won't] stop ringing[.]",
  },
  {
    concept: {
      uid: "6",
      name: "Common Nouns",
      conceptName: "Common Nouns",
      standard: "4.1g. Common Nouns",
    },
    needsFixing: true,
    prompt: "That is a huge cut[,] and I think we should go [to] the {Hospital}.",
    answer: "That is a huge cut[,] and I think we should go [to] the {hospital}.",
  },
  {
    concept: {
      uid: "7",
      name: "Proper Nouns",
      conceptName: "Proper Nouns",
      standard: "4.1g. Proper Nouns",
    },
    needsFixing: true,
    prompt: "We rented the movie {harry potter}, it is my [favorite]. What is yours[?]",
    answer: "We rented the movie {Harry Potter}, it is my [favorite]. What is yours[?]",
  },
  {
    concept: {
      uid: "8",
      name: "Contractions",
      conceptName: "Contractions",
      standard: "4.1g. Contractions",
    },
    needsFixing: true,
    prompt: "{Were} not able to use any of the pencils [red, green, blue, or gold].",
    answer: "{We're} not able to use any of the pencils [red, green, blue, or gold].",
  },
]
