const path = require("path");
const { v4: uuid } = require("uuid");
const { Picture } = require("../models");

const createPicture = async (image, problemId) => {
  let fileName = uuid() + "." + image.mimetype.split("/")[1];
  image.mv(path.resolve("static", fileName));
  await Picture.create({ image: fileName, problemId });
};

module.exports = { createPicture };
