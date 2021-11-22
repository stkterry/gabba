const { Schema, model } = require('mongoose');

const RoomSchema = new Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: String,
    default: null
  },

  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
  wbList: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  whitelist: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})


RoomSchema.statics.getAll = function () {
  return this.find()
    // .sort({ created: -1 })
    .lean()
}

module.exports = Room = model('Room', RoomSchema);