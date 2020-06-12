const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASSWORD } = require("../config");

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

module.exports = {
  async send(req, res) {
    const { from, to, subject, text } = req.body;

    const message = { from, to, subject, text };
    try {
      await transport.sendMail(message);
      return res.status(204).send();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ statusCode: 500, message: err });
    }
  },
};
