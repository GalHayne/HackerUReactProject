const { Card } = require("../models/card");
const { deleteAllUserThatFavorCrd } = require("../util/deleteAllUserThatFavorCrd")


const deleteCard = async (card_id, res) => {

   const card = await Card.findOne({
      _id: card_id,
   });

   if (card) {
      const results = deleteAllUserThatFavorCrd(card)
      results.then(async () => {

         const deleteCard = await Card.findOneAndRemove({
            _id: card_id,
         });

         if (!deleteCard) {
            return res.status(404).send("The card with the given ID was not found.");
         }
         res.send(deleteCard);
         res.status(201);
      })
   } else {

      return res.status(404).send("The card with the given ID was not found.");
   }

}

exports.deleteCard = deleteCard;