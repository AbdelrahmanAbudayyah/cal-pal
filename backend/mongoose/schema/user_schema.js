const { Schema } = require('mongoose');

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    email: { type: String, required: true }
  },
  {
    collection: 'users'
  }
);

module.exports = userSchema;