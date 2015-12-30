export function sentenceSplitter(sentence){
  if (typeof sentence === 'undefined') {
    throw new Error("You need to supply a sentence as a string")
  }
  return sentence.split(" ")
}

export function braceRemover(sentence){
  return sentence.replace(/[{}]/g, "")
}

export function getTargetWord(sentence){
  const words = sentenceSplitter(sentence);
  const word = words[getTargetIndex(sentence)]
  return braceRemover(word);
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
