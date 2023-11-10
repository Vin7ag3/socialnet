const { Thought, User } = require('../models/index');

// handling thoughts
module.exports = {
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
  
  // get single thought by Id
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) => {
          if (!thought) {
            return res.status(404).json({ message: 'No thought! Id invalid' });
          }
          res.json(thought);
        })
        .catch((err) => res.status(500).json(err));
    },
  
  // add new thought
    addThought(req, res) {
      Thought.create(req.body)
        .then((thought) => {
          User.findByIdAndUpdate(
            req.body.userId,
            { $addToSet: { thoughts: thought._id } },
            { new: true }
          ).then((user) => res.json({ thought, user }));
        })
        .catch((err) => res.status(500).json(err));
    },
  
  // update thought
    updateThought(req, res) {
      Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true, runValidators: true }
      )
        .then((thought) => {
          if (!thought) {
            return res.status(404).json({ message: 'No thought! Id invalid' });
          }
          res.json(thought);
        })
        .catch((err) => res.status(500).json(err));
    },
  
  // delete thought
    deleteThought(req, res) {
      Thought.findByIdAndDelete(req.params.thoughtId)
        .then((thought) => {
          if (!thought) {
            return res.status(404).json({ message: 'No thought! Id invalid' });
          }
          User.findByIdAndUpdate(
            thought.userId,
            { $pull: { thoughts: thought._id } },
            { new: true }
          ).then((user) => res.json({ thought, user }));
        })
        .catch((err) => res.status(500).json(err));
    },
  
  // add reaction to the thought
    addReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      )
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
  
  // delete reaction from thought
    deleteReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      )
        .then((thought) => {
          if (!thought) {
            return res.status(404).json({ message: 'No thought! Id invalid' });
          }
          res.json(thought);
        })
        .catch((err) => res.status(500).json(err));
    },
  };
  


  