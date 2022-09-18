const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f17604111ecb5a",
    pass: "0d6e9b7f34c0b0",
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve(__dirname, "../../templates/views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "../../templates/views"),
  extName: ".handlebars",
};

transporter.use("compile", hbs(handlebarOptions));

exports.sendMail = (mailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
};
