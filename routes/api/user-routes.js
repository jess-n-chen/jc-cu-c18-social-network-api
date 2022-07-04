const router = require("express").Router();
const {
  getAllUsers,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:id
router.route("/:id").get(getUserbyId).put(updateUser).delete(deleteUser);

module.exports = router;
