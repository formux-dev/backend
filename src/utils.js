function sum(array) {
  return array.reduce((acc, curr) => acc + curr);
}

function scale(array, desiredSum) {
  return array.map(value => (value / sum(array)) * desiredSum);
}

function average(ratings) {
  return sum(ratings) / rating.length;
}

function randomWithBias(options, biases) {
  let biasSum = 0;
  const cumulativeBias = biases.map(function (x) {
    biasSum += x;
    return biasSum;
  });

  const choice = Math.random() * biasSum;

  let chosenIndex = null;
  cumulativeBias.some((el, i) => {
    return el > choice ? ((chosenIndex = i), true) : false;
  });

  return options[chosenIndex];
}

function fillRest(array, fill, min) {
  if (array.length >= min) {
    return array;
  } else {
    let difference = min - array.length;
    return [...array, ...Array(difference > 0 ? difference : 0).fill(fill)];
  }
}

function maybeConvertToBool(string) {
  if (string == "true") return true;
  if (string == "false") return false;
  return string;
}

module.exports = {
  scale,
  randomWithBias,
  fillRest,
  average,
  maybeConvertToBool,
};
