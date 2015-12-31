import questionReducer from '../../app/reducers/questionReducer';
import actions, {submitFind, submitFix} from '../../app/actions';
import expect from 'expect';

describe("the question reducer", () => {
  const initialState = {
    concept: {
      name: "Than, Then",
      conceptName: "Than",
      standard: "4.1g. Commonly Confused Words"
    },
    answer: "There are more {than} 300 million people in the United States.",
    prompt: "There are more {then} 300 million people in the United States."
  }

  it("should be able to handle a correct find submission", () => {
    const action = submitFind(3)
    const newState = questionReducer(initialState, action)
    expect(newState.found).toEqual(true);
  })

  it("should be able to handle an incorrect find submission", () => {
    const action = submitFind(0)
    const newState = questionReducer(initialState, action)
    expect(newState.found).toEqual(false);
  })

  it("should be able to handle a correct fix submission", () => {
    const action = submitFix("than")
    const newState = questionReducer(initialState, action)
    expect(newState.fixed).toEqual(true);
  })

  it("should be able to handle an incorrect fix submission", () => {
    const action = submitFix("bleh")
    const newState = questionReducer(initialState, action)
    expect(newState.fixed).toEqual(false);
  })
})
