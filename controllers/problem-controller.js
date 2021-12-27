const problemService = require("./../services/problem-service");
const { SUCCESS_CREATE } = require("../utils/consts");

const create = async (req, res, next) => {
  try {
    const { title, description, tag } = req.body;

    const { id } = req.user;

    const { images } = req.files;
    await problemService.create(title, description, id, tag, images);
    res.json({ message: SUCCESS_CREATE });
  } catch (e) {
    console.log(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    let { q, page, limit, tag } = req.query;
    // if page not given
    page = page || 1;
    // if limit not given
    limit = limit || 6;

    //  pagination  отступ
    const offset = page * limit - limit;
    const problems = await problemService.getAll({ offset, limit, tag });
    res.json(problems);
  } catch (error) {
    res.status(404).json({ message: "tag not found" });
  }
};

module.exports = { create, getAll };

// problem?page=2&limit3&q= find by smth

// problem- pagination, search
// filter - by tag
