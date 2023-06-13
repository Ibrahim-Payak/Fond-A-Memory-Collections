import mongoose from "mongoose";

// create mongoose schema
const userSchema = mongoose.Schema({
  // have to have this things
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

//create model from schema
const User = mongoose.model("User", userSchema);

export default User;
