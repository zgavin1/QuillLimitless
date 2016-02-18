import  _ from 'underscore'
export function sentenceSplitter(sentence){
  if (typeof sentence === 'undefined') {
    throw new Error("You need to supply a sentence as a string");
  }
  const braceSplit = sentence.split(/({.*?})/);

  const squareSplit = braceSplit.map((sec) => {return sec.split(/(\[.*?\])/)});
  return _.flatten(squareSplit);
}

export function addUnderlines(sentence) {
  return sentenceSplitter(sentence).map((frag) => {
    var underline = false
    if (frag[0] === "{" || frag[0] === "[") {
      underline = true
    }
    return {text: frag, underline}
  })
}

export function addCorrectness(sentence) {
  return addUnderlines(sentence).map((hash) => {
    hash.correct = false
    if (hash.text[0] === "{") {
      hash.correct = true
    }
    return hash
  })
}

export function removeBraces(sentence) {
  return addCorrectness(sentence).map((hash) => {
    hash.text = braceRemover(hash.text)
    return hash
  })
}


export function braceRemover(sentence){
  return sentence.replace(/[{}\[\]]/g, "")
}

export function getTargetIndex(sentence){
  const words = sentenceSplitter(sentence);
  let j = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i][0] === "{") {
      j = i;
      break;
    }
  }
  return j;
}

export function getTargetPhrase(sentence){
  const words = sentenceSplitter(sentence);
  const word = words[getTargetIndex(sentence)]
  return braceRemover(word);
}
