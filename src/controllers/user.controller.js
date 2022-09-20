const User = require("../models/user.model");
const Verification = require("../models/verification.model");
const { createJwt } = require("../utils/jwt.util");
const { encrypt, compare } = require("../utils/bcrypt.util");
const { sendMail } = require("../utils/mail.util");
const randtoken = require("rand-token");

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message: "Tous les champs ne sont pas remplis correctement.",
    });
  }

  const user = await User.findOne({ where: { email: email } });

  if (user) {
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

  if (Object.keys(data).length) {
    const randomToken = randtoken.generate(16);

    await new User(data).save();
    await new Verification({
      email: email,
      token: randomToken,
    }).save();

    await sendMail({
      from: "matthieumelindev@gmail.com",
      to: email,
      subject: `Saki Lafée - Bienvenue ${firstName}`,
      template: "verification",
      context: {
        firstName: firstName,
        link: `http://localhost:3030/api/v1/users/verify/${randomToken}`,
      },
    });

    return res.status(201).json({
      message: "L'utilisateur a été créé.",
    });
  }

  return res.status(400).json({
    message: "Une erreur est survenue.",
  });
};

exports.login = async (req, res) => {
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

  const verification = await Verification.findOne({
    where: { email: email },
  });

  if (!verification.verified) {
    return res.status(401).json({
      message: "Veuillez vérifier votre compte.",
    });
  }

  const token = await createJwt(user);

  await user.update({
    accessToken: token.token,
    accessTokenExpires: token.expirationDate,
  });

  return res.status(200).json({
    message: "Vous êtes désormais connecté.",
    data: {
      accessToken: token.token,
      accessTokenExpires: token.expirationDate,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
};

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

exports.verify = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({
      message: "Un token doit être renseigné.",
    });
  }

  const verification = await Verification.findOne({
    where: { token: token },
  });

  if (!verification || verification.verified) {
    return res.status(401).json({
      message: "Non autorisé.",
    });
  }

  verification.verified = true;
  verification.token = "";

  await verification.save();

  return res.status(200).json({
    message: "Votre compte est désormais vérifié.",
  });
};
