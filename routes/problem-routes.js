const router = require("express").Router();

const problemController = require("./../controllers/problem-controller");
const auth = require("../middlewares/auth-middleware");

router.post("/create", auth, problemController.create);
router.get("/", problemController.getAll);

module.exports = router;
