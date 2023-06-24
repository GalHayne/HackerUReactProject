const { Card } = require("../models/card");

const removeFromTheCardUser = async (user) => {

    const mapCardsId = user.favoriteCard.map(card => {
        return card._id
    })
    for (let i = 0; i < mapCardsId.length; ++i) {
        let card = await Card.findOne({ _id: mapCardsId[i] })
        if (!card) return false;
        for (let j = 0; j < card.userFavorite.length; ++j) {
            if (JSON.stringify(card.userFavorite[j]._id) === JSON.stringify(user._id)) {
                card.userFavorite.splice(j, 1);
                card.save();
            }
        }
    }
    user.favoriteCard = [];
    user.save();
    return true;


}

exports.removeFromTheCardUser = removeFromTheCardUser;
