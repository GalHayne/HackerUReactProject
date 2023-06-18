const { Card } = require("../models/card");
const { deleteAllUserThatFavorCrd } = require("../util/deleteAllUserThatFavorCrd")


const deleteCard = async (card) => {


    // const card = await Card.findOne({
    //     _id: id,
    //   });
    
      if (card) {
         deleteAllUserThatFavorCrd(card)
      }
        
     return await Card.findOneAndRemove({
        _id: card._id,
      });
   

}

exports.deleteCard = deleteCard;