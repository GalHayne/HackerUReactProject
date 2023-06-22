const HOURS_TO_REMOVE_BLOCK = 1;

const removeTheBlock = (user) => {

    const dateNow = new Date();

    const deltaHours = (diff_hours(dateNow, user.timeBlock));

    console.log(deltaHours);

    if (deltaHours > HOURS_TO_REMOVE_BLOCK) {
        return true;
    }

    return false;
}

function diff_hours(dt2, dt1) {
    var diff = (dt2 - dt1) / 1000;
    return diff /= (60 * 60);
}

exports.removeTheBlock = removeTheBlock;