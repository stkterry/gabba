const { Schema, model } = require('mongoose');

const UserSchema = new Schema({

  handle: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  created: {
    type: Date,
    default: Date.now
  }

});

UserSchema.statics.exists = async function(options) {
  const result = await this.findOne(options).select('_id').lean();
  return result ? true : false;
}

UserSchema.statics.getAll = function () {
  return this.find()
    .sort({ created: -1 })
    .lean()
}

module.exports = User = model('User', UserSchema);
