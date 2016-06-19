var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    Comment = new Schema({
        text: String,
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book',
            required: true
        },
        postedBy: String,
        // username: String,
        email_id: String,
        approved: {
            type: Boolean,
            default: false
        },
        created: {
            type: Date,
            default: Date.now
        }
    });


module.exports = mongoose.model('comment', Comment);
