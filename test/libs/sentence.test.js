import expect from 'expect'
import {sentenceSplitter, braceRemover, getTargetWord, getTargetIndex} from '../../app/libs/sentence'

describe("sentenceSplitter", () => {
  it("should throw error when called with no arguments", () => {
    expect(sentenceSplitter).withArgs().toThrow(/You need to supply a sentence as a string/)
  });

  it("should return a list of words with the spaces removed", () => {
    const provided = "You shall not pass";
    const expected = ["You", "shall", "not", "pass"];
    expect(sentenceSplitter(provided)).toEqual(expected);
  })
})

describe("braceRemover", () => {
  it("should remove curly braces from sentences", () => {
    const provided = "You shall {not} pass";
    const expected = "You shall not pass";
    expect(braceRemover(provided)).toEqual(expected)
  })

  it("should remove curly braces from individual words", () => {
    const provided = "{not}";
    const expected = "not";
    expect(braceRemover(provided)).toEqual(expected)
  })

  it("should return the word if no braces are present", () => {
    const provided = "You";
    const expected = "You";
    expect(braceRemover(provided)).toEqual(expected)
  })
})

describe("getTargetWord", () => {
  it("should return the word that is between curly braces", () => {
    const provided = "You shall {not} pass";
    const expected = "not";
    expect(getTargetWord(provided)).toEqual(expected);
  })
})

describe("getTargetIndex", () => {
  it("should return the index of word that is between curly braces", () => {
    const provided = "You shall {not} pass";
    const expected = 2;
    expect(getTargetIndex(provided)).toEqual(expected);
  })
})
