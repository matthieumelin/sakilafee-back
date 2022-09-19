const Article = require("../models/article.model");

exports.fetch = async (req, res) => {
  const articles = await Article.findAll();
  return res.status(200).json(articles);
}

exports.create = async (req, res) => {
  const { name, description, category, pictures, price, stockMin } = req.body;

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

exports.update = async (req, res) => {

}

exports.delete = async (req, res) => {

}