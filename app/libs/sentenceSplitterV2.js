export function sentenceSplitter(sentence){
  if (typeof sentence === 'undefined') {
    throw new Error("You need to supply a sentence as a string")
  }
  var beforeBrace = sentence.split("{")[0]
  var afterBrace = sentence.split("{")[1]
  var target = afterBrace.split("}")[0]
  var afterTarget = afterBrace.split("}")[1]
  var returner = beforeBrace.split(/(\S+\s+)/).filter(function(n) {return n});
  returner.push("{" + target + "}");
  returner = returner.concat(afterTarget.split(/(\S+\s+)/).filter(function(n) {return n}));
  return returner.filter(function(n){ return n != '' }); ;
}

export function braceRemover(sentence){
  return sentence.replace(/[{}]/g, "")
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
