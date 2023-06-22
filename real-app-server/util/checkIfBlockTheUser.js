

const checkIfBlockTheUser = (user) => {

    if (user.incorrectLoginAttempts >= 3) {
        user.block = true;
        user.save()
        return true;
    }

    return false;

}

exports.checkIfBlockTheUser = checkIfBlockTheUser;