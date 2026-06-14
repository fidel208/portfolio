const express = require("express");
const cors = require("cors");
const AfricasTalking = require("africastalking");
require("dotenv").config();

const app = express();
app.use(express.json());

const credentials = {
  apiKey: process.env.API_KEY,
  username: process.env.USER_NAME,
};

const africasTalking = require("africastalking")(credentials);
const sms = AfricasTalking.SMS;

app.post("");
