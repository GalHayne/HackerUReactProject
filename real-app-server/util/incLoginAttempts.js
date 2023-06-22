const incLoginAttempts = (user) => {
    user.incorrectLoginAttempts = user.incorrectLoginAttempts + 1;
    if (user.incorrectLoginAttempts >= 3) {
        user.block = true;
        user.timeBlock = new Date();
    }
    user.save();
};

exports.incLoginAttempts = incLoginAttempts;
