const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({

  pageId: {
    type: String,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    default: 0,
    min: 0,
    max: 50
  },

  messages: [{
    handle: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true,
      maxLength: 256
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],

  created: {
    type: Date,
    default: Date.now
  }

})

MessageSchema.statics.addNew = function (message, room) {
  
  const now = new Date();

  let newMessage = {
    handle: message.handle,
    content: message.content,
    date: Date.now()
  }

  return this.findOneAndUpdate({"pageId": new RegExp(room), 'count': { $lt: 25 } }, 
    {
      "$push": {
        messages: { ...newMessage }
      },
      "$inc": { 'count': 1 },
      "$setOnInsert": { 'pageId': room + '_' + (Math.round(Date.now() / 1000)).toString()}
    },
    { upsert: true, new: true }
  )
  .then(update => update._id ? newMessage : null )
  
}

MessageSchema.statics.getAll = function () {
  return this.find()
    .sort({ pageId: -1 })
    .lean()
}

module.exports = Message = model('Message', MessageSchema);
