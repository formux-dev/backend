const { getBiasData } = require("./getBiasData");

const { softmax, randomWithBias, maybeConvertToBool } = require("./utils");

async function generateTheme(formId) {
  return (await getBiasData(formId)).reduce((acc, feature) => {
    const options = feature.options.map(item => item.value);
    const biases = softmax(feature.options.map(item => item.rating));

    const result = randomWithBias(options, biases);

    return { ...acc, [feature.name]: maybeConvertToBool(result) };
  }, {});
}

module.exports = {
  generateTheme,
};
