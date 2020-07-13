const { Thought, User } = require('../models');

const thoughtController = {
    //GET all Thoughts
getAllThoughts(req, res) {
        Thought.find({})
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

//GET Thoughts By Id
getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
},

//CREATE a Thought
createThought({ params, body }, res) {
    Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id }},
                { new: true, runValidators: true }
            );
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id'});
            return;
            }
            res.json(dbUserData) 
        })
        .catch(err => {
            res.status(400).json(err);
        },
        
        updateThought({ params, body }, res) {
            Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
                .populate({
                    path: 'reactions',
                    select: '-__v'
                })
                .select('-___v')
                .then(dbThoughtData => {
                    if (!dbThoughtData) {
                        res.status(404).json({ message: 'No thought found with this id!' });
                        return;
                    }
                    res.json(dbThoughtData);
                })
                .catch(err => res.status(400).json(err));
    
        },
    
        // // Create reaction
        addReaction({ params, body}, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body }}, 
                { new: true, runValidators: true }
            )
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))
    
        },
    
        // Find thought and delete
        deleteThought({ params }, res) {
            Thought.findOneAndDelete({ _id: params.id })
                .then(dbThoughtData => {
                    if (!dbThoughtData) {
                        res.status(404).json({ message: 'No thought found with this id!' });
                        return;
                    }
                    res.json(dbThoughtData);
                })
                .catch(err => res.status(400).json(err));
        },
    
        // // Find reaction and delete 
        deleteReaction({ params }, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId }, 
                { $pull: { reactions: { reactionId: params.reactionId }}},
                { new : true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
        }
    
    
    }
    
    module.exports = thoughtController;