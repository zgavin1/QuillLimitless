import questionReducer from '../../app/reducers/questionReducer';
import actions, {submitFind, submitFix} from '../../app/actions';
import expect from 'expect';

describe("the question reducer", () => {
  const initialState = {
    answeredQuestions: [],
    currentQuestion: {
      concept: {
        name: "Than, Then",
        conceptName: "Than",
        standard: "4.1g. Commonly Confused Words"
      },
      answer: "There are more {than} 300 million people in the United States.",
      prompt: "There are more {then} 300 million people in the United States."
    },
    unansweredQuestions: []
  }

  it("should not change its answer or prompt when submitting a find answer", () => {
    const action = submitFind(3)
    const newState = questionReducer(initialState, action)
    expect(newState.currentQuestion.prompt).toEqual(initialState.currentQuestion.prompt);
    expect(newState.currentQuestion.answer).toEqual(initialState.currentQuestion.answer);
  });

  it("should not change its answer or prompt when submitting a find answer", () => {
    const action = submitFix("than")
    const newState = questionReducer(initialState, action)
    expect(newState.currentQuestion.prompt).toEqual(initialState.currentQuestion.prompt);
    expect(newState.currentQuestion.answer).toEqual(initialState.currentQuestion.answer);
  });

  it("should be able to handle a correct find submission", () => {
    const action = submitFind(3)
    const newState = questionReducer(initialState, action)
    expect(newState.currentQuestion.found).toEqual(true);
  })

  it("should be able to handle an incorrect find submission", () => {
    const action = submitFind(0)
    const newState = questionReducer(initialState, action)
    expect(newState.currentQuestion.found).toEqual(false);
  })

  const findTests = [0, 1, 2, 3, 5, 8, 13]
findTests.forEach((test) => {
    it("should store the find submission", () => {
      const action = submitFind(test)
      const newState = questionReducer(initialState, action)
      expect(newState.currentQuestion.submittedFind).toEqual(test);
    })
  });

  it("should be able to handle a correct fix submission", () => {
    const action = submitFix("than")
    const newState = questionReducer(initialState, action)
    expect(newState.currentQuestion.fixed).toEqual(true);
  })

  it("should be able to handle an incorrect fix submission", () => {
    const action = submitFix("bleh")
    const newState = questionReducer(initialState, action)
    expect(newState.currentQuestion.fixed).toEqual(false);
  })

  const fixTests = ["This", "too", "shall", "pass", "OK", "Go!"]
  fixTests.forEach((test) => {
    it("should store the find submission", () => {
      const action = submitFix(test)
      const newState = questionReducer(initialState, action)
      expect(newState.currentQuestion.submittedFix).toEqual(test);
    })
  });
})
