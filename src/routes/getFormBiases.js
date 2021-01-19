const { getBiasData } = require("../getBiasData");

async function getFormBiases(request, response) {
  try {
    const { formId } = request.params;

    const biases = await getBiasData(formId);

    response.send({
      biases,
    });
  } catch ({ message }) {
    response.status(500).send({ message });
  }
}

module.exports = getFormBiases;
