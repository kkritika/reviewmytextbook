var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Book = new Schema({
        title: String,
        isbn:  String,
        author: {
            name: String,
            email_id: String
        },
        publisher: {
            name: String,
            publishing_year: Number
        },
        img: {
        	"img_cover": String
        },
        category: String,
        description: String,
        added_date: {
            type: Date,
            default: Date.now
        }
    });

module.exports = mongoose.model('book', Book);
