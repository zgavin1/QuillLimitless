import expect from 'expect'
import Question from '../../app/libs/question'

describe("initializing a question", () => {
  const prompt = "He's over {their} reading."
  const answer = "He's over {there} reading."
  const question = new Question(prompt, answer)

  it("should return a prompt and answer", () => {
    expect(question.prompt).toEqual(prompt)
    expect(question.answer).toEqual(answer)
  })

  it("should be able to check a find attempt", () => {
    expect(question.checkFind(0)).toBe(false)
    expect(question.checkFind(2)).toBe(true)
    expect(question.checkFind(7)).toBe(false)
  })

  it("should be able to mark itself as correct for a find attempt", () => {
    question.submitFind(0)
    expect(question.found).toBe(false)
    question.submitFind(2)
    expect(question.found).toBe(true)
    question.submitFind(7)
    expect(question.found).toBe(false)
  })

  it("should be able to check a fix attempt", () => {
    expect(question.checkFix("their")).toBe(false)
    expect(question.checkFix("there")).toBe(true)
    expect(question.checkFix("asdf")).toBe(false)
  })

  it("should be able to mark itself as correct for a fix attempt", () => {
    question.submitFix("their")
    expect(question.fixed).toBe(false)
    question.submitFix("there")
    expect(question.fixed).toBe(true)
    question.submitFix("asdf")
    expect(question.fixed).toBe(false)
  })


})
