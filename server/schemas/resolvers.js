const { AuthenticationError } = require("apollo-server-express");
const { User, Earthquake } = require("../models");
const { signToken } = require("../utils/auth");
const { distance } = require("../utils/helpers");

const resolvers = {
  Query: {
    getFriends: async (parent, args, context) => {
      if (context.user) {
        const earthquakes = await Earthquake.find().lean();
        const user = await User.findById(context.user._id)
          .populate("friends")
          .lean();

        const friends = user.friends.map((friend) => {
          const eqInProximity = earthquakes.filter((earthquake) => {
            const dist = distance(
              friend.latitude,
              earthquake.latitude,
              friend.longitude,
              earthquake.longitude
            );
            return dist < 15 && earthquake.mag > 2;
          });
          return { ...friend, eqInProximity };
        });
        return friends;
      }
    },
    usersWithoutCurr: async (parent, args, context) => {
      if (context.user) {
        const currUser = await User.findById(context.user._id);
        const users = await User.find({
          _id: {
            $ne: context.user._id,
          }
        });

        return users.filter((user) => !currUser.friends.includes(user._id));
      }

      throw new AuthenticationError("Not logged in");
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        console.log(user);
        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        await User.findByIdAndUpdate(context.user._id, {
          $push: { friends: friendId},
        });
      }
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      console.log("email");
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    updateCoordinates: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          context.user._id,
          args.coordinates,
          { new: true }
        );
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
