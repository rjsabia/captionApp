const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  firstName: {type: String, default: ""},
  email: {type: String, 
    required: true, 
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  userPics: {
    picture: [{picId: String, dataLabel: String}]
  },
  password: {
    type: String,
    required: true
  },
});

UserSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    username: this.username || '',
    firstName: this.firstName || '',
    email: this.email || '',
    userPics: this.userPics || '',
  };
}

UserSchema.methods.validatePassword = function(password) {
  return bcrypt
    .compare(password, this.password)
    .then(isValid => isValid);
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt
    .hash(password, 10)
    .then(hash => hash);
}

const User = mongoose.model('User', UserSchema);

module.exports = {User};