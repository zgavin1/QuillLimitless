import questionReducer from '../../app/reducers/questionReducer';
import actions, {submitFind, submitFix, nextQuestion} from '../../app/actions';
import expect from 'expect';
import testQuestions from '../../app/utils/testQuestions';

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
    unansweredQuestions: testQuestions
  }

  it("should not change its answer or prompt when submitting a find answer", () => {
    const action = submitFind(3)
    const newState = questionReducer(initialState, action)
    expect(newState.currentQuestion.prompt).toEqual(initialState.currentQuestion.prompt);
    expect(newState.currentQuestion.answer).toEqual(initialState.currentQuestion.answer);
  });

  it("should not change its answer or prompt when submitting a fix answer", () => {
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

describe("going to the next question", () => {
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
    unansweredQuestions: testQuestions
  }

  it("should respond to the NEXT_QUESTION action", () => {
    const action = nextQuestion();
    const newState = questionReducer(initialState, action);
    expect(newState).toNotEqual(initialState);
  })

  it("should have the previous current question as the last item in the answeredQuestions array", () => {
    const action = nextQuestion();
    const newState = questionReducer(initialState, action);
    const lastAnsweredQuestion = newState.answeredQuestions[newState.answeredQuestions.length - 1];
    expect(initialState.answeredQuestions).toEqual([]);
    expect(lastAnsweredQuestion).toEqual(initialState.currentQuestion);
  })

  it("should have the new current question as the first item in the unansweredQuestions array", () => {
    const action = nextQuestion();
    const newState = questionReducer(initialState, action);
    const firstUnansweredQuestion = initialState.unansweredQuestions[0];
    expect(newState.currentQuestion).toEqual(firstUnansweredQuestion);
  })

  it("should not have the new current question in the unansweredQuestions array", () => {
    const action = nextQuestion();
    const newState = questionReducer(initialState, action);
    const oldfirstUnansweredQuestion = initialState.unansweredQuestions[0];
    const newfirstUnansweredQuestion = newState.unansweredQuestions[0];
    expect(newState.currentQuestion).toEqual(oldfirstUnansweredQuestion);
    expect(newState.currentQuestion).toNotEqual(newfirstUnansweredQuestion);
  })

  it("should set the current question to undefined if there are no more unanswered questions", () => {
    initialState.unansweredQuestions = [];
    const action = nextQuestion();
    const newState = questionReducer(initialState, action);
    expect(newState.currentQuestion).toNotExist();
  })

  it("should not push undefined into the answeredQuestions array if there is no current question", () => {
    initialState.currentQuestion = undefined;
    const action = nextQuestion();
    const newState = questionReducer(initialState, action);
    expect(newState.answeredQuestions.length).toEqual(0);
  })
})
