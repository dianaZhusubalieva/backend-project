const ErrorHandler = require("./../utils/error-handler");

const { User } = require("./../models/index");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const {
  USER_ALREADY_EXISTS,

  USER_NOT_FOUND,
  WRONG_CREDENTIALS,
} = require("../utils/consts");
const { generateTokens } = require("../utils/tokens");
const { sendActivationMail } = require("./mail-service");

const signup = async (email, password, firstName, lastName, role) => {
  const oldUser = await User.findOne({ where: { email } });

  if (oldUser) {
    throw ErrorHandler.BadRequest(USER_ALREADY_EXISTS);
  }

  const hashedPassword = await bcrypt.hash(password, 3);
  // unique link to email
  const activationLink = uuid();

  const user = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    role,
    activationLink,
  });

  await sendActivationMail(
    email,
    `${process.env.API}/api/user/activate/${activationLink}`
  );
  const tokens = generateTokens({ id: user.id, email, role });

  return tokens;
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw ErrorHandler.BadRequest(USER_NOT_FOUND);
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw ErrorHandler.BadRequest(WRONG_CREDENTIALS);
  }

  const tokens = generateTokens({ id: user.id, email, role: user.role });

  return tokens;
};

const activate = async (link) => {
  const user = await User.findOne({ where: { activationLink: link } });

  if (!user) {
    throw ErrorHandler.BadRequest("activation llink is incorrect");
  }
  user.isActivated = true;

  // сохранить пользователя в бд
  await user.save();
};

const statuses = {
  active: async () => {
    return await User.findAll({ where: { isActivated: true } });
  },
  inactive: async () => {
    return await User.findAll({ where: { isActivated: false } });
  },
  default: async () => await User.findAll(),
};

const getAll = async (status) => {
  return statuses[status] ? statuses[status]() : statuses["default"]();
};

module.exports = { signup, getAll, login, activate };
