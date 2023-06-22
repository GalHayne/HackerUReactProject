const { removeTheBlock } = require("./removeTheBlock");

const checkIfUserBlock = (user) => {

    if (user.block) {
        if (removeTheBlock(user)) {
            user.incorrectLoginAttempts = 0;
            user.block = false;
            user.timeBlock = null;
            user.save();
        }
    }

    return user.block


}

exports.checkIfUserBlock = checkIfUserBlock;