const { firestore } = require("../admin");

async function getForms(request, response) {
  try {
    const forms = await firestore.collection("forms").get();

    response.send(
      forms.docs
        .filter(doc => doc.data().meta && doc.data().meta.title)
        .map(doc => {
          return {
            formId: doc.id,
            title: doc.data().meta.title,
          };
        })
    );
  } catch ({ message }) {
    response.status(500).send({ message });
  }
}

module.exports = getForms;
