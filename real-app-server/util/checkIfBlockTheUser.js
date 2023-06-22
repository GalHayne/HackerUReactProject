
const DELTA_HOURS_TO_BLOCK = 24

const checkIfBlockTheUser = (user) => {

    const arr = user.timeBlock;

    const deltaTime = diff_hours( arr[arr.length-1],arr[0]);

    return deltaTime < DELTA_HOURS_TO_BLOCK;
}

function diff_hours(dt2, dt1) {
    var diff = (dt2 - dt1) / 1000;
    return diff /= (60 * 60);
}

exports.checkIfBlockTheUser = checkIfBlockTheUser;