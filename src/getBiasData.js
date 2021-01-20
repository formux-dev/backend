const { firestore } = require("./admin");

const { themeOptions } = require("./themeOptions");
const { fillRest, average } = require("./utils");

async function getBiasData(formId) {
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

        ratings = ratings.docs.map(doc => doc.data().rating);
        ratings = fillRest(ratings, 3, 5);

        return {
          value: option,
          rating: average(ratings),
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

module.exports = {
  getBiasData,
};
