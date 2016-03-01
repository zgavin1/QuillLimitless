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
      uid: "1",
      name: "Past Tense",
      conceptName: "Past Tense",
      standard: "4.1g. Past Tense",
    },
    needsFixing: true,
    prompt: "We [incorrect option] initially [incorrect option] remove all of the old furniture from the storage area, [incorrect option] we decided against doing so because it {correct answer} too much time.",
    answer: "We [incorrect option] initially [incorrect option] remove all of the old furniture from the storage area, [incorrect option] we decided against doing so because it {correct answer} too much time.",
  },
  {
    concept: {
      uid: "2",
      name: "Red Herrring",
      conceptName: "Red Herrring",
      standard: "4.1g. Red Herrring"
    },
    prompt: "In Gee’s Bend, Alabama, [incorrect answer] quilts [incorrect answer] outdoors on sunny spring days, attracting local quilters who enjoy [incorrect answer] display of one another’s [incorrect answer].",
    answer: "In Gee’s Bend, Alabama, [incorrect answer] quilts [incorrect answer] outdoors on sunny spring days, attracting local quilters who enjoy [incorrect answer] display of one another’s [incorrect answer].",
  },
]
