//create a function and writie busiess logic over here

import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import Listing from "./../models/listing.model.js";

export const test = (req, res) => {
  res.json({
    message: "API routing is working",
  });
};

//$set - its going to check the changes happened or not.
export const updateUser = async (req, res, next) => {
  console.log("Request user ID: ", req.user.id);
  console.log("Request Params Id: ", req.params.id);
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      console.log("Hashing password....");
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    console.log("Updating user with data", req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    console.log("Updated user", updatedUser);

    //once we get the new, separate the password and rest.
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log("Error updating user", error);
    next(error);
  }
};

// delete API
export const deleteUser = async (req, res, next) => {
  //gonna check the token first
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  //try to check is the user authenticate not a fraud
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, " You can only view your own listings!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    //to just get user data :
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found!"));
    //separate the password, as its don't needed.
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
