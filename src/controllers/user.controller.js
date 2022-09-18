const User = require("../models/user.model");
const { createJwt } = require("../utils/jwt.util");
const { encrypt, compare } = require("../utils/bcrypt.util");
const { sendMail } = require("../utils/mail/mail.util");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Tous les champs ne sont pas remplis correctement.",
      });
    }

    const isExist = await User.findOne({ where: { email: email } });

    if (isExist) {
      return res.status(400).json({
        message: "L'utilisateur existe déjà.",
      });
    }

    const encryptedPassword = await encrypt(password);
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
    };

    if (data.email && data.password) {
      const user = await new User(data);

      user.save();

      return res.status(201).json({
        message: "L'utilisateur a été créé.",
      });
    }

    return res.status(400).json({
      message: "Une erreur est survenue.",
    });
  } catch (error) {
    console.error("An error occurred while creating a user: ", error);
    return res.status(400).json({
      message: error,
    });
  }
};

exports.verify = async (req, res) => {
  const { email } = req.body;
}

exports.forgot = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Le champ e-mail n'est pas remplis correctement.",
    });
  }

  const user = await User.findOne({ where: { email: email } });

  if (user) {
    await sendMail({
      from: "matthieumelindev@gmail.com",
      to: email,
      subject: "Saki Lafée - Réinitialisation du mot de passe",
      template: "forgot",
      context: {
        link: "templink",
      },
    });
  }

  return res.status(200).json({
    message: "Un e-mail vient d'être envoyé sur l'adresse renseignée.",
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Tous les champs ne sont pas remplis correctement.",
      });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({
        message: "L'email et/ou le mot de passe est incorrect.",
      });
    }

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(400).json({
        message: "L'email et/ou le mot de passe est incorrect.",
      });
    }

    const token = await createJwt(user);

    const data = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      token: token,
    }

    return res.status(200).json({
      message: "Vous êtes désormais connecté.",
      data: data
    });
  } catch (error) {
    console.error("An error occurred while logged a user: ", error);
    return res.status(400).json({
      message: error,
    });
  }
};
