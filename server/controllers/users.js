//all handler for our routes
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user.js";

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User Already exist" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password doesn't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
      email,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1hr",
    });

    return res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const signIn = async (req, res) => {
  //req coming from front end
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const passwordVeri = await bcrypt.compare(password, existingUser.password);

    if (!passwordVeri)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
