const express = require("express");
const _ = require("lodash");
const { Card, validateCard, generateBizNumber } = require("../models/card");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();
const { deleteAllUserThatFavorCrd } = require("../util/deleteAllUserThatFavorCrd")

router.get("/",  async (req, res) => {

  const cards = await Card.find();
  res.send(cards);
  res.status(200);
});

router.delete("/:card_id", auth, async (req, res) => {
  const card = await Card.findOne({
    _id: req.params.card_id,
  });

  if (card) {
    const res = deleteAllUserThatFavorCrd(card)
    console.log(res);
  }
    
  const deleteCard = await Card.findOneAndRemove({
    _id: req.params.card_id,
  });
  if (!deleteCard)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(deleteCard);
  res.status(201);

});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = await Card.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");

  card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(card);
});

router.get("/:id", auth, async (req, res) => {
  const card = await Card.findOne({
    _id: req.params.id,
  });
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(card);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = new Card({
    bizName: req.body.bizName,
    bizDescription: req.body.bizDescription,
    bizAddress: req.body.bizAddress,
    bizPhone: req.body.bizPhone,
    bizImage: req.body.bizImage
      ? req.body.bizImage
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    bizNumber: await generateBizNumber(Card),
    user_id: req.user._id,
  });

  post = await card.save();
  res.send(post);
});

module.exports = router;
