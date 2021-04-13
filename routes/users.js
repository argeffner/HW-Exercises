const express = require("express");
const router = new express.Router();
const {ensureLoggedIn, ensureCorrectUser} = require("../middleware/auth");
const ExpressError = require("../expressError");
const User = require('../models/user');

// Don't forget to pass the middleware for each route
/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get("/", ensureLoggedIn, async function(req, res, next){
    try { 
        // fetch users.all() function from user model 
        const users = await User.all();
        return res.json({users});
    } catch (err) {
        return next (err);
    }
});


/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
 router.get("/:username", ensureCorrectUser, async function(req, res, next){
    try { 
        // fetch users.get(username) function from user model
        const user = await User.get(req.params.username);
        return res.json({user});
    } catch (err) {
        return next (err);
    }
});

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
 router.get("/:username/to", ensureCorrectUser, async function(req, res, next){
    try { 
        // fetch users.messagesto() function from user models 
        const messages = await User.messagesTo(req.params.username);
        return res.json({messages});
    } catch (err) {
        return next (err);
    }
});

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
 router.get("/:username/from", ensureCorrectUser, async function(req, res, next){
    try { 
        // fetch users.messagesfrom() function from user models 
        const messages = await User.messagesFrom(req.params.username);
        return res.json({messages});
    } catch (err) {
        return next (err);
    }
});

module.exports = router;