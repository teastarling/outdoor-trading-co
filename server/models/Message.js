const { Schema, model } = require('mongoose');

const messageSchema = new Schema ({
    message: {
        type: String,
    },
    userTo: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    userFrom: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    item: {
        type: Schema.ObjectId,
        ref: 'Item',
    },
});

const Message = model('Message', messageSchema);

module.exports = Message;