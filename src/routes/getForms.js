const { firestore } = require("../admin");

async function getForms(request, response) {
  try {
    const forms = await firestore.collection("forms").get();

    response.send(
      forms.docs.map(doc => {
        return {
          id: doc.id,
          title: doc.data().meta.title,
        };
      })
    );
  } catch ({ message }) {
    response.status(500).send({ message });
  }
}

module.exports = getForms;
