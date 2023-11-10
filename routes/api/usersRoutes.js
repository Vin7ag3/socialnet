const router = require('express').Router();

// import controller function for user routes
const { 
  getUsers, 
  getSingleUser, 
  addUser, 
  updateUser, 
  deleteUser, 
  addFriend, 
  deleteFriend } = require('../../controllers/usersController');

// define routes for users and friends
router.route('/')
  .get(getUsers)
  .post(addUser);

router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

// export router
module.exports = router;
