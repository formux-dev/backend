const { firestore } = require("./admin");

const { themeOptions } = require("./themeOptions");
const { softmax, randomWithBias, fillRest, average, maybeConvertToBool } = require("./utils");

async function prepareThemeData(formId) {
  const getFeature = async (name, optionsList) => {
    let options = await Promise.all(
      optionsList.map(async option => {
        let ratings = await firestore
          .collection("forms")
          .doc(formId)
          .collection("ratings")
          .doc(name)
          .collection(option.toString())
          .get();

        ratings = ratings.docs
          .map(doc => doc.data().rating)
          .map(rating => Math.pow(rating, 2).toFixed(1));
        ratings = fillRest(ratings, 3.0, 10);

        return {
          value: option,
          ratings,
        };
      })
    );

    return {
      name,
      options,
    };
  };

  return await Promise.all(
    themeOptions.map(async feature => await getFeature(feature.name, feature.options))
  );
}

async function generateTheme(formId) {
  return (await prepareThemeData(formId)).reduce((acc, feature) => {
    const options = feature.options.map(item => item.value);
    const biases = softmax(feature.options.map(item => average(item.ratings)));

    const result = randomWithBias(options, biases);

    return { ...acc, [feature.name]: maybeConvertToBool(result) };
  }, {});
}

module.exports = {
  generateTheme,
};
