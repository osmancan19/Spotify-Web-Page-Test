const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cs458project1@gmail.com",
    pass: "97PECe3SbrKrs32",
  },
});

app.post("/reset", (req, res) => {
  const mailOptions = {
    from: "cs458project1@gmail.com",
    to: req.body.email,
    subject: "Reset Password",
    text:
      "You can reset your Spotify password by clicking the link: https://www.spotify.com/password-reset/",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
