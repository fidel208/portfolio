const express = require("express");
const cors = require("cors");
const { Result } = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json());

const credentials = {
  apiKey: process.env.API_KEY,
  username: process.env.USER_NAME,
};

const AfricasTalking = require("africastalking")(credentials);
const sms = AfricasTalking.SMS;

app.post("/api/portfolio-contact", async (req, res) => {
  const { userNumber, userName } = req.body;

  if (!userNumber) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  const smsMessage = `Fidel Muthomi: \n Hello ${userName}, thank you for contacting Fidel Muthomi. Fidel will reach out as soon as possible. Keep checking your email for further updates. Good day`;

  try {
    const result = await sms.send({
      to: [userNumber],
      message: smsMessage,
    });
    console.log(`Message sent successfuly to ${userNumber}`);
    return res.status(200).json({ success: true, details: result });
  } catch (error) {
    console.error("Africa's talking API error");
    return res.status(500).json({ error: "Failed to send message" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Portfolio backend running on port ${PORT}`),
);

module.exports = app;