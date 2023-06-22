const checkIfUserBlock = (user) => {
  if (user.block) {
    return user.block;
  }
};

exports.checkIfUserBlock = checkIfUserBlock;
