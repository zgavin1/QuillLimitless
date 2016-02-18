import expect from 'expect'
import {sentenceSplitter,braceRemover, getTargetPhrase, getTargetIndex, addUnderlines, addCorrectness, removeBraces} from '../../app/libs/sentenceSplitterV3'

describe("sentenceSplitter", () => {
  it("should throw error when called with no arguments", () => {
    expect(sentenceSplitter).withArgs().toThrow(/You need to supply a sentence as a string/)
  });

  it("should return a list of words with the spaces removed", () => {
    const provided = "You {shall not} pass";
    const expected = ["You ", "{shall not}", " pass"];
    expect(sentenceSplitter(provided)).toEqual(expected);
  })

  it("should return a list of words split on curly and square braces", () => {
    const provided = "You {shall} [not] pass";
    const expected = ["You ", "{shall}", " ", "[not]", " pass"];
    expect(sentenceSplitter(provided)).toEqual(expected);
  })

  it("should return a list of words split on curly and square braces as hashes that have an underline field", () => {
    const provided = "You {shall} [not] pass";
    const expectedZero = {text: "You ", underline: false};
    const expectedOne = {text: "{shall}", underline: true}
    const expectedThree = {text: "[not]", underline: true}
    expect(addUnderlines(provided)[0]).toEqual(expectedZero);
    expect(addUnderlines(provided)[1]).toEqual(expectedOne);
    expect(addUnderlines(provided)[3]).toEqual(expectedThree);
  })

  it("should return a list of words split on curly and square braces as hashes that have an correct field", () => {
    const provided = "You {shall} [not] pass";
    // const expectedZero = {text: "You ", underline: false};
    // const expectedOne = {text: "{shall}", underline: true}
    // const expectedThree = {text: "[not]", underline: true}
    expect(addCorrectness(provided)[0].correct).toEqual(false);
    expect(addCorrectness(provided)[1].correct).toEqual(true);
    expect(addCorrectness(provided)[3].correct).toEqual(false);
  })

  it("should return a list of words split on curly and square braces as hashes that have the braces removed", () => {
    const provided = "You {shall} [not] pass";
    // const expectedZero = {text: "You ", underline: false};
    // const expectedOne = {text: "{shall}", underline: true}
    // const expectedThree = {text: "[not]", underline: true}
    expect(removeBraces(provided)[0].text).toEqual("You ");
    expect(removeBraces(provided)[1].text).toEqual("shall");
    expect(removeBraces(provided)[3].text).toEqual("not");
  })
})
