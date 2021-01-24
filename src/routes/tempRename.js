const { firestore } = require("../admin");

async function tempRename(request, response) {
  try {
    const docRef = await firestore.collection("forms").doc("M02EQbNoOWlczvLwJM84");

    const block = docRef.get().data().block;

    docRef.update({
      blocks: block,
    });

    response.send("the code ran... maybe it worked too");
  } catch ({ message }) {
    response.status(500).send({ message });
  }
}

module.exports = tempRename;
