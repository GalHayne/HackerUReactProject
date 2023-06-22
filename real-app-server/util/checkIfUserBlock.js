const { removeTheBlock } = require("./removeTheBlock");

const checkIfUserBlock = (user) => {

    if (user.block) {
        if (removeTheBlock(user)) {
            user.block = false;
            user.save();
        }
    }

    return user.block


}

exports.checkIfUserBlock = checkIfUserBlock;