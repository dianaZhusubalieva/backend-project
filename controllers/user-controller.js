const ErrorHandler = require("./../utils/error-handler");

const UserService = require("./../services/user-service");

const signup = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    const userData = await UserService.signup(
      email,
      password,
      firstName,
      lastName,
      role
    );
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await UserService.login(email, password);
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

const activate = async (req, res) => {
  try {
    const { link } = req.params;
    await UserService.activate(link);
    return res.redirect("https://www.google.com");
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { status } = req.query;
    const users = await UserService.getAll(status);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, getAll, login, activate };
