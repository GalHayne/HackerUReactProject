const { User } = require("../models/user");
const { Card } = require("../models/card");

const removeFavoriteCardFromUser = async (user_id, card_id) => {

  let user = await User.findOne({ _id: user_id });
  let card = await Card.findOne({ _id: card_id });

  if (user && card) {
    let index;

    for (let i = 0; i < user.favoriteCard.length; ++i) {
      if (
        JSON.stringify(card._id) === JSON.stringify(user.favoriteCard[i]._id)
      ) {
        index = i;
      }
    }

    user.favoriteCard.splice(index, 1);
    user.save();

    for (let i = 0; i < card.userFavorite.length; ++i) {
      if (JSON.stringify(user._id) === JSON.stringify(card.userFavorite[i])) {
        index = i;
      }
    }
    card.userFavorite.splice(index, 1);
    card.save();
    return true;
  }
  return false;
};

exports.removeFavoriteCardFromUser = removeFavoriteCardFromUser;
