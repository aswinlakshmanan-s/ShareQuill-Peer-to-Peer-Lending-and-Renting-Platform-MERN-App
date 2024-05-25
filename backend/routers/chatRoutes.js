const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  groupExit,
  fetchGroups,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const messageRoute = require('./messageRoutes');

const router = express.Router();

router.route("/startChat/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.use(messageRoute);
// router.route("/createGroup").post(protect, createGroupChat);
// router.route("/fetchGroups").get(protect, fetchGroups);
// router.route("/groupExit").put(protect, groupExit);

module.exports = router;
