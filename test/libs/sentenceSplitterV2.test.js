import expect from 'expect'
import {sentenceSplitter,braceRemover, getTargetPhrase, getTargetIndex} from '../../app/libs/sentenceSplitterV2'

describe("sentenceSplitter", () => {
  it("should throw error when called with no arguments", () => {
    expect(sentenceSplitter).withArgs().toThrow(/You need to supply a sentence as a string/)
  });

  it("should return a list of words with the spaces removed", () => {
    const provided = "You {shall not} pass";
    const expected = ["You", "{shall not}", "pass"];
    expect(sentenceSplitter(provided)).toEqual(expected);
  })
})

describe("getTargetPhrase", () => {
  it("should return the phrase that is between curly braces", () => {
    const provided = "You {shall not} pass";
    const expected = "shall not";
    expect(getTargetPhrase(provided)).toEqual(expected);
  })
})

describe("getTargetIndex", () => {
  it("should return the index of word that is between curly braces", () => {
    const provided = "You shall {not} pass";
    const expected = 2;
    expect(getTargetIndex(provided)).toEqual(expected);
  })
})
