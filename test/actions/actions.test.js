import actions, {submitFind, submitFix} from '../../app/actions';
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
})
