export default [
  // {
  //   concept: {
  //     uid: "1",
  //     name: "Capitalization",
  //     conceptName: "Capitalization",
  //     standard: "4.1g. Capitalization"
  //   },
  //   answer: "smith",
  //   prompt: [{text: "Dear", underline: true},{text: " "},{text: "Mr.", underline: true},{text: " "},{text: "smith", underline: true, correct: true},{text: ","}]
  // },
  {
    concept: {
      uid: "1",
      name: "Capitalization",
      conceptName: "Capitalization",
      standard: "4.1g. Capitalization"
    },
    answer: "smith",
    prompt: [{text: "We "},{text: "had", underline: true},{text: " "},{text: "initially "},{text: "planned to", underline: true, correct: false},{text: " remove all of the old furniture from the storage area, "},{text: "but", underline: true, correct: false},{text: " we decided against doing so because it "},{text: "would have took", underline: true, correct: true}, {text: " too much time."}]
  },
  {
    concept: {
      uid: "1",
      name: "Capitalization",
      conceptName: "Capitalization",
      standard: "4.1g. Capitalization"
    },
    noAnswer: true,
    answer: "smith",
    prompt: [{text: "We "},{text: "had", underline: true},{text: " "},{text: "initially "},{text: "planned to", underline: true, correct: false},{text: " remove all of the old furniture from the storage area, "},{text: "but", underline: true, correct: false},{text: " we decided against doing so because it "},{text: "would have taken", underline: true, correct: false}, {text: " too much time."}]
  },
]
