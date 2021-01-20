const { getBiasData } = require("./getBiasData");

const { scale, randomWithBias, maybeConvertToBool } = require("./utils");

async function getTheme(formId) {
  return (await getBiasData(formId)).reduce((acc, feature) => {
    const options = feature.options.map(item => item.value);
    const biases = scale(
      feature.options.map(item => item.rating),
      1
    );

    const result = randomWithBias(options, biases);

    return { ...acc, [feature.name]: maybeConvertToBool(result) };
  }, {});
}

module.exports = {
  getTheme,
};
