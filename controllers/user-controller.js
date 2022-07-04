const { User, Thought } = require("../models");

const userController = {
  // GET All Users
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // GET a Single User
  getUserbyId({ params }, res) {
    User.findOne({ _id: params.id })
      .populate([
        { path: "thoughts", select: "-__v" },
        { path: "friends", select: "-__v" },
      ])
      .select("-__v")
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // Create a User
  // example data
  // {
  //   "username": "lernantino",
  //   "email": "lernantino@gmail.com"
  // }
  createUser({ body }, res) {
    User.create(body)
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // Update User by ID
  // example data
  // {
  //   "username": "lernantino",
  //   "email": "lernantino@gmail.com"
  // }
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // Delete User by ID
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
};

module.exports = userController;
