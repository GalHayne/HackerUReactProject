const { Card } = require("../models/card");
const { deleteAllUserThatFavorCrd } = require("../util/deleteAllUserThatFavorCrd")


const deleteCard = async (card) => {

   if (card) {
      deleteAllUserThatFavorCrd(card)
   }

   return await Card.findOneAndRemove({
      _id: card._id,
   });


}

exports.deleteCard = deleteCard;