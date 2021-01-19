const { firestore } = require("../admin");

async function getFormResponses(request, response) {
  try {
    const { formId } = request.params;
    const responses = await firestore.collection("forms").doc(formId).collection("responses").get();

    const result = responses.docs.map(response => response.data());

    response.send(result);
  } catch ({ message }) {
    response.status(500).send({ message });
  }
}

module.exports = getFormResponses;
