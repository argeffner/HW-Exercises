// const { router } = require("express");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = new express.Router();

const { SECRET_KEY } = require("../config");
const User = require('../models/user');
const ExpressError = require("../expressError");


/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
 router.post("/login", async function (req, res, next) {
    try {
      const { username, password } = req.body;
    // call model functions to pass data
        if (await User.authenticate(username, password)) {
          let token = jwt.sign({ username }, SECRET_KEY);
          // Don't forget to pzss in the timestamp for login
          User.updateLoginTimestamp(username);
          return res.json({ token });
        } else {
            throw new ExpressError("Invalid user/password", 400);
        }
      } catch (err) {
      return next(err);
    }
  });


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post("/register", async function (req, res, next) {
    try {
        // user User.register instead of passing in data and writing extra logic
        const { username } = await User.register(req.body);
        let token = jwt.sign({ username }, SECRET_KEY);
        User.updateLoginTimestamp(username);
        return res.json({ token });

    } catch (err) {
        return next(err);
    }
});

module.exports = router;