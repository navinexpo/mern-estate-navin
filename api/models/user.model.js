import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is mandatory'],
    },
    avatar: {
      type: String,
      default:
        "https://e7.pngegg.com/pngimages/572/686/png-clipart-computer-icons-user-profile-account-login-chang-miscellaneous-text.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
