const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    addReaction,
    deleteThought,
    deleteReaction
} = require('../../controllers/thought-controller');

//api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    

    // api/thoughts/:id
    router
        .route('/:id')
        .get(getThoughtById)
        .put(updateThought)
        .delete(deleteThought);

        // api/thoughts/:userId
        router  
            .route('/:userId')
            .put(createThought)
            
    // /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(addReaction);

// /api/thoughts/:thoughtId/reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;
