const { firestore } = require("../admin");

async function postForm(request, response) {
  const { formId, rating, theme, data } = request.body;

  try {
    await firestore
      .collection("forms")
      .doc(formId)
      .collection("responses")
      .add({
        data,
        info: {
          rating,
          timestamp: Date.now(),
        },
      });

    for (const [name, option] of Object.entries(theme)) {
      await firestore
        .collection("forms")
        .doc(formId)
        .collection("ratings")
        .doc(name)
        .collection(option.toString())
        .add({
          rating,
        });
    }

    response.send({
      message: "ok",
    });
  } catch ({ message }) {
    response.status(500).send({ message });
  }
}

module.exports = postForm;
