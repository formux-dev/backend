function softmax(arr) {
  return arr.map(value => {
    return Math.exp(value) / arr.map(y => Math.exp(y)).reduce((a, b) => a + b);
  });
}

function randomWithBias(options, biases) {
  let sum = 0;
  const cumulativeBias = biases.map(function (x) {
    sum += x;
    return sum;
  });

  const choice = Math.random() * sum;

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

function average(rating) {
  return rating.reduce((a, b) => a + b) / rating.length;
}

function maybeConvertToBool(string) {
  if (string == "true") return true;
  if (string == "false") return false;
  return string;
}

module.exports = {
  softmax,
  randomWithBias,
  fillRest,
  average,
  maybeConvertToBool,
};
