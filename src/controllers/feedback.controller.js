const Feedback = require("../models/feedback.model");
const apiConfig = require("../../config/config.json").development;
const jwt = require("../utils/jwt.util");

exports.create = async (req, res) => {
  try {
    const { userToken, name, note, message } = req.body;

    if (!userToken || !name || !note || !message) {
      return res.status(400).json({
        message: "Tous les champs ne sont pas remplis correctement.",
      });
    }

    const tokenData = jwt.verify(userToken);

    if (!tokenData) {
      return res.status(400).json({
        message: "Une erreur est survenue.",
      });
    }

    const data = {
      userId: tokenData.id,
      name: name,
      note: note,
      message: message,
    };

    if (data.userId && data.name && data.note && data.message) {
      const feedback = await new Feedback(data);

      feedback.save();

      return res.status(201).json({
        message: "L'avis client a été créé.",
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
