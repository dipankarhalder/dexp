import mongoose from "mongoose";

const Schema = mongoose.Schema;
const usersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  terms: {
    type: Boolean,
    default: true,
  },
},
{
  timestamps: true,
});

const Users = mongoose.models.Users || mongoose.model('User', usersSchema);
module.exports = Users;