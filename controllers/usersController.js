const { Thought, User } = require('../models/index');

// handling users
module.exports = {
    getUsers(req, res) {
      User.find()
        .populate('thoughts friends', '-__v')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
  
  // get single user by Id + thoughts + friends
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: 'Cannot find user with that Id' });
          }
          res.json(user);
        })
        .catch((err) => res.status(500).json(err));
    },
  
  // add new user
    addUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
  
  // update user
    updateUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: 'Cannot find user with that Id' });
          }
          res.json(user);
        })
        .catch((err) => res.status(500).json(err));
    },
  
  // delete user and their thought
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: 'Cannot find user with that Id' });
          }
          return Thought.deleteMany({ _id: { $in: user.thoughts } });
        })
        .then(() => res.json({ message: 'User and thoughts deleted' }))
        .catch((err) => res.status(500).json(err));
    },
  
  // add friend to users friend array
    addFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: 'Cannot find user with that Id' });
          }
          res.json(user);
        })
        .catch((err) => res.status(500).json(err));
    },
  
  // delete friend from users friend array
    deleteFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: 'Cannot find user with that Id' });
          }
          res.json(user);
        })
        .catch((err) => res.status(500).json(err));
    },
};
  