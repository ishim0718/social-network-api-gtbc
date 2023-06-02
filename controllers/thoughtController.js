const { Thought, User } = require('../models');

module.exports = {
	//get all thoughts
    getThoughts(req, res) {
      Thought.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err)); 
    },
		//get a single thought
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then(async (thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // create a new thought
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
		// update thought
		updateThought(req, res) {
			Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $set: req.body },
				{ runValidators: true, new: true }
			)
				.then((thought) =>
				!thought
					? res.status(404).json({ message: 'No thought with that ID' })
					: res.status(thought)
			)
				.catch((err) => {
					console.log(err);
					res.status(500).json(err)
			});
		},
    // Delete a thought and remove them from the user
    deleteThought(req, res) {
      Thought.findOneAndRemove({ _id: req.params.studentId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : User.findOneAndUpdate(
                { thought: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((course) =>
          !course
            ? res.status(404).json({
                message: 'Thought deleted, but no user found',
              })
            : res.json({ message: 'Thought successfully deleted' })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    // Add an reaction to a thought
    addReaction(req, res) {
      console.log(req.body);
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reaction: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Remove reaction from a thought
    removeReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !student
            ? res
                .status(404)
                .json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
  };
  