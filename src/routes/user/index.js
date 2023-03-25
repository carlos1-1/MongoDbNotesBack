const express = require("express");
const router = express.Router();

const getUser = require("./get");
const updateUser = require("./update.js");
const postUser = require("./post.js");
const deleteUser = require("./delete.js");
const getUserNotes = require("./getNotes.js");

router.use("/", getUser);
router.use("/", updateUser);
router.use("/", postUser);
router.use("/", deleteUser);
router.use("/", getUserNotes);

module.exports = router;
