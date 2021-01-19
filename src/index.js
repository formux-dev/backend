const functions = require("firebase-functions");
const express = require("express");
const app = express();

const cors = require("cors");
const xss = require("xss-clean");
const bodyParser = require("body-parser");

const getForms = require("./routes/getForms");
const getForm = require("./routes/getForm");
const getFormReport = require("./routes/getFormReport");
const postForm = require("./routes/postForm");

const corsOptions = {
  origin: true,
};

app.use(cors(corsOptions));
app.use(xss());
app.use(express.json());
app.use(bodyParser.json());

app.get("/forms", getForms);
app.get("/forms/:formId", getForm);
app.get("/forms/:formId/report", getFormReport);
app.post("/forms", postForm);

exports.api = functions.https.onRequest(app);
