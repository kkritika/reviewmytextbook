var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');
var Book = require('../models/book.js');
var Comment = require('../models/comment.js');
var loggedInUser;
// user api - register, login, logout, status
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.post('/register', function(req, res) {
    User.register(new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    }), req.body.password, function(err, account) {
        if (err) {
            return res.status(500).json({
                err: err
            });
        }
        passport.authenticate('local')(req, res, function() {
            return res.status(200).json({
                status: 'Registration successful!'

            });

        });
    });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                status: 'Login successful!'
            });
            loggedInUser = user;
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

router.get('/status', function(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true
    });
});

// books api - get, post, delete, put

router.get('/books', function(req, res) {
    Book.find(function(err, books) {
        if (err)
            res.send(err);

        res.json(books);
        console.log(books[0].title);
    });
});

/*router.post('/books/add', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Book.create({
        title: req.body.title,
        isbn:  req.body.isbn,
        author: {
            name: req.body.author.name,
            email_id: req.body.author.email_id
        },
        publisher: {
            name: req.body.publisher.name,
            publishing_year: req.body.publisher.publishing_year
        },
        img: {
          "img_cover": req.body.img.img_cover
        },
        category: req.body.category,
        description: req.body.description
        }, function(err, book) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Book.find(function(err, books) {
                if (err)
                    res.send(err)
                res.json(books);
            });
        });

    });
*/
router.get('/books/:book_id', function(req, res) {
    Book.findById(req.params.book_id, function(err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
});

router.get('/user/:username', function(req, res) {
    User.find({ username: req.params.username }, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
});

router.delete('/books/:book_id', function(req, res) {
    Book.find({
        id: req.params.book_id
    }, function(err, book) {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});

router.get('/comments/approve', function(req, res) {
    Comment.find({ approved: false }, function(err, comments) {
        if (err)
            res.send(err);

        res.json(comments);
    });
})




router.put('/comments/:comment_id/approve', function(req, res) {

    // use our comment model to find the bear we want
    Comment.findById(req.params.comment_id, function(err, comment) {

        if (err)
            res.send(err);

        comment.approved = true; // update the bears info

        // save the bear
        comment.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Comment approved!' });
        });

    });
});




router.get('/books/:book_id/comments/', function(req, res) {
    Comment.find({ book: req.params.book_id }, function(err, comments) {
        if (err)
            res.send(err);

        res.json(comments);
    });
});

router.get('/comments/', function(req, res) {
    Comment.find(function(err, comments) {
        if (err)
            res.send(err);

        res.json(comments);
    });
});

router.post('/books/:book_id/comments/', function(req, res) {
    // var user;

    Comment.create({
            text: req.body.text,
            book: req.params.book_id,
            postedBy: req.body.postedBy,
            username: req.body.username,
            email_id: req.body.email_id
        },
        function(err, comments) {
            if (err)
                res.send(err);
            res.json(comments);
        });
});

// router.post('/registeruser/', function(req,res){
//     User.create({
//         name: req.body.name,
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password
//     },
//         function(err, user) {
//             if (err)
//                 res.send(err);
//             res.json(user);
//         });
// });


module.exports = router;
