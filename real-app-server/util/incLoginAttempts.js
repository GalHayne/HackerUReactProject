const TIMES_FAILS_ATTEMPTS = 3;

const { checkIfBlockTheUser, removeTheOldAttempts } = require("./checkIfBlockTheUser");

const incLoginAttempts = (user) => {
  
  user.timeBlock.push(new Date());
  removeTheOldAttempts(user);
  if (user.timeBlock.length > TIMES_FAILS_ATTEMPTS) user.timeBlock.shift();
  if (user.timeBlock.length === TIMES_FAILS_ATTEMPTS) {
    if (checkIfBlockTheUser(user)) user.block = true;
  }
  user.save();
};

exports.incLoginAttempts = incLoginAttempts;
