const { firestore } = require("../admin");

async function getFormReport(request, response) {
  try {
    const { formId } = request.params;
    const responses = await firestore.collection("forms").doc(formId).collection("responses").get();

    const result = responses.docs
      .sort((a, b) => a.data().info.timestamp - b.data().info.timestamp)
      .map((response, index) => {
        const { rating } = response.data().info;
        return { index, rating };
      });

    response.send(result);
  } catch ({ message }) {
    response.status(500).send({ message });
  }
}

module.exports = getFormReport;
