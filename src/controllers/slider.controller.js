const Slider = require("../models/slider.model");

exports.findAll = async (req, res) => {
  const slider = await Slider.findAll();
  return res.status(200).json(slider);
};

exports.create = async (req, res) => {
  const { title, description, link, image, bgColor } = req.body;

  if (!title || !description || !link || !image || !bgColor) {
    return res.status(400).json({
      message: "Tous les champs ne sont pas remplis correctement.",
    });
  }

  const slider = await Slider.findOne({ where: { title: title } });

  if (slider) {
    return res.status(400).json({
      message: "La bannière existe déjà.",
    });
  }

  const data = {
    title: title,
    description: description,
    link: link,
    image: image,
    bgColor: bgColor,
  };

  if (Object.keys(data).length) {
    await new Slider(data).save();

    return res.status(201).json({
      message: "La bannière a été créé.",
    });
  }
};

exports.update = async (req, res) => {
  const { id, title, description, link, image, bgColor } = req.body;

  if (!id || !title || !description || !link || !image || !bgColor) {
    return res.status(400).json({
      message: "Tous les champs ne sont pas remplis correctement.",
    });
  }

  const slider = await Slider.findOne({ where: { id: id } });

  if (!slider) {
    return res.status(400).json({
      message: "La bannière n'existe pas.",
    });
  }

  await slider.update(
    {
      title: title,
      description: description,
      link: link,
      image: image,
      bgColor: bgColor,
    },
    { where: { id: id } }
  );

  return res.status(200).json({
    message: "La bannière a été mise à jour.",
  });
};

exports.delete = async (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({
      message: "Tous les champs ne sont pas remplis correctement.",
    });
  }

  const slider = await Slider.findOne({ where: { id: id } });

  if (!slider) {
    return res.status(400).json({
      message: "La bannière n'existe pas.",
    });
  }

  await slider.destroy();

  return res.status(200).json({
    message: "La bannière a été supprimé.",
  });
};
