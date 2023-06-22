const removeTheBlock = (user) => {

    const dateNow = new Date();

    const deltaHours = (diff_hours(dateNow, user.timeBlock));

    console.log(deltaHours);

    if (deltaHours > 0.27) {
        return true;
    }

    return false;
}

function diff_hours(dt2, dt1) {

    console.log(dt1);
    console.log(dt2);

    var diff = (dt2 - dt1) / 1000;
    return diff /= (60 * 60);


}

exports.removeTheBlock = removeTheBlock;