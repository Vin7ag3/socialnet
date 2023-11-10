const router = require('express').Router();

// import controller function for thought routes
const { 
  getThoughts, 
  getSingleThought, 
  addThought, 
  updateThought, 
  deleteThought, 
  addReaction, 
  deleteReaction } = require('../../controllers/thoughtsController');

// routes for managing thoughts and reaction
router.route('/')
  .get(getThoughts)
  .post(addThought);

router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions')
  .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

// export router
module.exports = router;
