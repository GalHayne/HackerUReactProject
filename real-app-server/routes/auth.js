const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const { checkIfUserBlock } = require("../util/checkIfUserBlock");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or password.");
  }

  if (checkIfUserBlock(user)) {
    console.log('user is block');
    res.status(400);
    res.send('User Is Block');
    return;
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    user.incorrectLoginAttempts = user.incorrectLoginAttempts + 1;
    if (user.incorrectLoginAttempts >= 3) {
      user.block = true;
      user.timeBlock = new Date();
    }
    user.save();
    return res.status(400).send("Invalid email or password.");
  }

  res.json({ token: user.generateAuthToken() });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(req);
}

module.exports = router;
