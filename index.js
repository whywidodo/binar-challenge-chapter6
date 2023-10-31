require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routes");

app.use(express.json({ strict: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server is runing at port ${port}`);
});
