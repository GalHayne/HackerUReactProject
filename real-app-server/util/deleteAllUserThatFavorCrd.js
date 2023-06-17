const { Card } = require("../models/card");
const { User } = require("../models/user");

const deleteAllUserThatFavorCrd = async (card) => {

let userIdx;

  if (card) {
    for (let i = 0 ; i < card.userFavorite.length; ++i){
      const currentUser = card.userFavorite[i];
      const user = await User.findOne({_id: currentUser});

        for (let j = 0; j < user.favoriteCard.length; ++j){

          if (JSON.stringify(card._id) === JSON.stringify(user.favoriteCard[j]._id)){
            userIdx = j;
            console.log(userIdx);
          }
        }
        user.favoriteCard.splice(userIdx,1);
        user.save();
    }
  }
}

exports.deleteAllUserThatFavorCrd = deleteAllUserThatFavorCrd;