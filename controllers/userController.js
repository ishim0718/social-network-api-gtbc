const { User, Thought } = require('../models');

module.exports = {
	// get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
			.catch((err) => res.status(500).json(err)); 
  },
	// get a single user by id
	getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
	// create a new user
	createUser(req, res) {
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
			.then((user) =>
			!user
				? res.status(404).json({ message: 'No user with that ID' })
				: res.json(user)
		)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
		});
	},
	// delete a user and all their thoughts
	deleteUser(req, res) {
		User.findOneAndRemove({ _id: req.params.userId })
			.then((user) => 
			!user
				? res.status(404).json({ message: 'No user exists with that id'})
				: Thought.remove({ user_id: { $in: user.thoughts }})
		)
		.then(() => res.json({ message: 'User and their thoughts deleted' }))
		.catch((err) => res.status(500).json(err));
	},
	//add a user to the friend list
	addFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res
						.status(404).json({ message: 'No user with that ID'})
					: res.json(user)
		)	
	},
	//delete friend from friend list
	removeFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
			)
			.then((user) =>
				!user
					? res
						.status(404).json({ message: 'No user with that ID'})
					: res.json(user)
		)	
	}
};