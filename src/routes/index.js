const { getIE } = require("../controllers");

const router = require("express").Router();

router.get("/ie", getIE);

module.exports = router;
