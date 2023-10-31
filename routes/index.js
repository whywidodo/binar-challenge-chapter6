const express = require("express");
const router = express.Router();
const bookRoute = require("./books.route");

router.get("/", (req, res) => {
  return res.status(200).json({
    success: "Ok",
    statusCode: "200",
    message: "Your API url is ready to use.",
  });
});

router.use("/books", bookRoute);

module.exports = router;