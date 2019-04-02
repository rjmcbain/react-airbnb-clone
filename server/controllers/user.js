const User = require("../models/user");
const MongooseHelpers = require("../helpers/mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config/dev");

exports.auth = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!password || !email) {
    return res.status(422).send({
      errors: [
        { title: "Data Missing!", detail: "Please Provide Email and Password" }
      ]
    });
  }
  User.findOne({ email }, function(err, user) {
    if (err) {
      return res
        .status(422)
        .send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
    }
    if (!user) {
      return res.status(422).send({
        errors: [{ title: "Invalid User!", detail: "User Does Not Exist!" }]
      });
    }

    if (user.hasSamePassword(password)) {
      // Return JWT Token
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username
        },
        config.SECRET,
        { expiresIn: "1h" }
      );

      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [{ title: "Wrong Data!", detail: "Wrong Email or Password" }]
      });
    }
  });
};

exports.register = function(req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirmation = req.body.passwordConfirmation;

  if (!username || !email) {
    return res.status(422).send({
      errors: [
        { title: "Data Missing!", detail: "Please Provide Email and Password" }
      ]
    });
  }
  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [
        { title: "Invalid Password!", detail: "Passwords Do Not Match!" }
      ]
    });
  }

  User.findOne({ email }, function(err, existingUser) {
    if (err) {
      return res
        .status(422)
        .send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
    }

    if (existingUser) {
      return res.status(422).send({
        errors: [
          {
            title: "Invalid Email!",
            detail: "User with this email already exists!"
          }
        ]
      });
    }
    const user = new User({
      username,
      email,
      password
    });
    user.save(function(err) {
      if (err) {
        return res
          .status(422)
          .send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
      }
      return res.json({ registered: true });
    });
  });

  // res.json({ username, email });
};

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    const user = parseToken(token);
    User.findById(user.userId, function(err, user) {
      if (err) {
        return res
          .status(422)
          .send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
      }

      if (user) {
        res.locals.user = user;
        next();
      } else {
        return res.status(422).send({
          errors: [
            {
              title: "Not Authorized!",
              detail: "You Need To Login To Get Access"
            }
          ]
        });
      }
    });
  } else {
    return res.status(422).send({
      errors: [
        { title: "Not Authorized!", detail: "You Need To Login To Get Access" }
      ]
    });
  }
};

function parseToken(token) {
  return jwt.verify(token.split(" ")[1], config.SECRET);
}
