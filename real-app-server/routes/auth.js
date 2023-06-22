const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const { checkIfUserBlock } = require("../util/checkIfUserBlock");
const { incLoginAttempts } = require("../util/incLoginAttempts");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error){
    return res.status(400).send(error.details[0].message);
  }
    

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("The user is not registered on the site.");
  }

  if (checkIfUserBlock(user)) {
    
    return res.status(401).send('Sorry, the user is blocked, please contact the manager');
    
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    incLoginAttempts(user);
    return res.status(402).send("Invalid email or password.");
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
