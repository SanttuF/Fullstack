const express = require("express");
const { getAsync } = require("../redis");
const router = express.Router();

router.get("/", async (_, res) => {
  const added_todos = await getAsync("added_todos");
  res.send({ added_todos });
});

module.exports = router;
