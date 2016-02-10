// import expect from 'expect'
// import WordDiff from '../../app/libs/sentenceDiff'
//
// describe("initializing a question", () => {
//   const prompt = "He's over their reading."
//   const answer = "He's over there reading."
//   const submisstion = "He's over there reading."
//   const wordDiff = new WordDiff(prompt, answer, submisstion)
//   const submissionChangeObjects = wordDiff.genChangeObjects();
//   const expectedChangeObjects = wordDiff.genExpectedChangeObjects();
//   const formattedSub = wordDiff.formattedChangeObjects(submissionChangeObjects)
//   const formattedExp = wordDiff.formattedChangeObjects(expectedChangeObjects)
//
//   it("should return a prompt and answer", () => {
//     expect(wordDiff.prompt).toEqual(prompt)
//     expect(wordDiff.answer).toEqual(answer)
//   })
//
//   it("should generate change opjects for the submission", () => {
//     expect(submissionChangeObjects).toEqual(expectedChangeObjects)
//   })
//
//   it("should generates formatted data for the addition changes", () => {
//     console.log(formattedSub)
//     expect(formattedSub.additions).toEqual([{ count: 1, added: true, removed: undefined, value: 'there' }])
//     expect(formattedSub.deletions).toEqual([{ count: 1, added: undefined, removed: true, value: 'their' }])
//   })
//
//   const correct = wordDiff.markSubmission()
//   const incorrectWordDiff = new WordDiff(prompt, answer, "He's over their reading.")
//   const incorrect = incorrectWordDiff.markSubmission()
//
//   it("can check for index of expected in submitted", () => {
//
//     console.log(correct);
//     expect(correct.additions[0].correct).toBe(true)
//
//     console.log("incorrect");
//     console.log(incorrect);
//     expect(incorrect.additions[0].correct).toBe(undefined)
//   })
//
//   it("can return the number of correct answers", () => {
//     expect(wordDiff.calcScores().found).toEqual(1)
//     expect(wordDiff.calcScores().extra).toEqual(0)
//     expect(incorrectWordDiff.calcScores().found).toEqual(0)
//     expect(incorrectWordDiff.calcScores().extra).toEqual(0)
//   })
//
//   it("can return the number of correct answers as a fraction", () => {
//     expect(wordDiff.fractionScores().found).toEqual("1/1")
//     expect(incorrectWordDiff.fractionScores().found).toEqual("0/1")
//   })
//
//   it("can return the number of unessacary edits", () => {
//     const extraWordDiff = new WordDiff(prompt, answer, "Hes over there reading.")
//     expect(extraWordDiff.calcScores().extra).toEqual(1)
//   })
// })
