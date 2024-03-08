import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      user?.password || "",
      password
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controlller", error.message);
    res.status(500).json({ error: " Internal Server Error" });
  }
};

export const logoutUser = (req, res, next) => {
  res.send("logout route");
};
export const signupUser = async (req, res, next) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    // console.log(fullName, username, password, confirmPassword);
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password does not match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "username already exists" });
    }

    // hash password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?usrename=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?usrename=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        __id: newUser.__id,
        fullName: newUser.fullName,
        username: newUser.username,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user date" });
    }
  } catch (error) {
    console.log("Error in signup controlller", error.message);
    res.status(500).json({ error: " Internal Server Error" });
  }
};
