const { firestore } = require("../admin");
const { generateTheme } = require("../generateTheme");

async function getForm(request, response) {
  try {
    const { formId } = request.params;
    const doc = await firestore.collection("forms").doc(formId).get();

    const theme = await generateTheme(formId);

    response.send({
      ...doc.data(),
      theme,
    });
  } catch ({ message }) {
    response.status(500).send({ message });
  }
}

module.exports = getForm;
