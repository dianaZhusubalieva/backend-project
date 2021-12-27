const router = require("express").Router();
const problemRoutes = require("./problem-routes");
const userRoutes = require("./user-routes");

router.use("/user", userRoutes);
router.use("/problem", problemRoutes);

module.exports = router;
