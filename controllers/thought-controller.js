const { Thought, User } = require("../models");

const thoughtController = {
  // GET All Thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .then((dbThought) => {
        res.json(dbThought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // GET a Single Thought
  getThoughtbyId({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select("-__v")
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // Create a Thought
  // example data
  // {
  //   "thoughtText": "Here's a cool thought...",
  //   "username": "lernantino",
  //   "userId": "5edff358a0fcb779aa7b118b"
  // }
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
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

  // Update Thought by ID
  // example data
  // {
  //   "thoughtText": "Here's a cool thought...",
  //   "username": "lernantino",
  //   "userId": "5edff358a0fcb779aa7b118b"
  // }
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // Delete Thought by ID
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // Add Reaction by Thought ID
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // Delete Reaction by Thought ID
  // example data
  // {
  //   "reactionId": "5edff358a0fcb779aa7b118b"
  // }
  deleteReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: body.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
