import actions, {submitFind, submitFix, nextQuestion} from '../../app/actions';
import expect from 'expect';

describe("submit actions", () => {
  it("should be able to generate a submit find action", () => {
    const action = submitFind(1);
    expect(action).toEqual({type: "SUBMIT_FIND", index: 1})
  })

  it("should be able to generate a submit fix action", () => {
    const action = submitFix("word");
    expect(action).toEqual({type: "SUBMIT_FIX", word: "word"})
  })

  it("should be able to generate a next question action", () => {
    const action = nextQuestion();
    expect(action).toEqual({type: "NEXT_QUESTION"})
  })
})
