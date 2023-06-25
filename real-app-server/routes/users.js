const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validateCards } = require("../models/user");
const { Card } = require("../models/card");
const auth = require("../middleware/auth");
const { removeFavoriteCardFromUser } = require("../util/removeFavoriteCard");
const router = express.Router();

const getCards = async (cardsArray) => {
  const cards = await Card.find({ bizNumber: { $in: cardsArray } });
  return cards;
};

router.get("/cards", auth, async (req, res) => {
  if (!req.query.numbers) res.status(400).send("Missing numbers data");

  let data = {};
  data.cards = req.query.numbers.split(",");

  const cards = await getCards(data.cards);
  res.send(cards);
});

router.get("/", auth, async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get("/:id", auth, async (req, res) => {
  const user = await User.find({ _id: req.params.id });

  if (user && user?.length !== 0) {
    res.status(200);
    res.send(user);
  } else {
    res.status(404).send("The user does not exist");
  }
});

router.get("/userCards/:user_id", auth, async (req, res) => {
  const cards = await Card.find({ user_id: req.params.user_id });

  if (!cards)
    return res.status(404).send("The user with the given ID was not found.");

  return res.status(200).send(cards);
});

router.put("/:id", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.params.id });

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  user.biz = !user.biz;

  user.save();

  res.send(user);
});

router.put("/toggleUser/:id", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.params.id });

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  user.biz = !user.biz;

  user.save();

  res.send(user);
});

router.put("/removeBlock/:id", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.params.id });

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  user.block = false;
  user.timeBlock = [];

  user.save();

  res.send(user);
});

router.delete("/deleteUser/:id", auth, async (req, res) => {
  let cards = await Card.find({ user_id: req.params.id });

  if (cards.length === 0) {
    const user = await User.findOne({ _id: req.params.id });
    if (user.favoriteCard.length === 0) {
      const userDelete = await User.findOneAndRemove({ _id: req.params.id });
      res.status(201).send(userDelete);
    } else {
      const mapCardsId = user.favoriteCard.map(card => {
        return card._id
      })
      for (let i = 0; i < mapCardsId.length; ++i) {
        let card = await Card.findOne({ _id: mapCardsId[i] })
        for (let j = 0; j < card.userFavorite.length; ++j) {
          if (JSON.stringify(card.userFavorite[j]._id) === JSON.stringify(user._id)) {
            card.userFavorite.splice(j, 1);
            card.save();
          }
        }
      }
      user.favoriteCard = [];
      user.save();
      res.status(200).send('need cal again to delete')
    }
  } else {
    res.status(404).send(cards);
  }
});

router.put("/updateDetails/:id", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.params.id });

  let users = await User.find({ email: req.body.email });

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
    
    if (users.length > 0)
    return res.status(404).send("The email already exists in the system , choose another one");

  user.email = req.body.email;
  user.name = req.body.name;

  user.save();
  res.send('success update details');
});

router.put("/addFavoriteCard/:card_id/:user_id", auth, async (req, res) => {
  let card = await Card.findOne({ _id: req.params.card_id });
  let user = await User.findOne({ _id: req.params.user_id });

  if (user && card) {
    user.favoriteCard.push(card);
    card.userFavorite.push(user._id);
    card.save();
    user.save();
    res.send(user).status(201);
  } else {
    res.status(404);
    res.send("error cant find the cards or user");
  }
});

router.put("/removeFavoriteCard/:card_id/:user_id", auth, async (req, res) => {
  if (removeFavoriteCardFromUser(req.params.user_id, req.params.card_id)) {
    const user = await User.findOne({ _id: req.params.user_id });
    res.send(user);
    res.status(201);
  } else {
    res.status(400);
  }
});

router.get("/FavoriteCard/:_id", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.params._id });
  if (user) {
    res.send(user);
  } else {
    res.send("no user connect");
    res.status(401);
  }
});

router.patch("/cards", auth, async (req, res) => {
  const { error } = validateCards(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const cards = await getCards(req.body.cards);
  if (cards.length != req.body.cards.length)
    res.status(400).send("Card numbers don't match");

  let user = await User.findById(req.user._id);
  user.cards = req.body.cards;
  user = await user.save();
  res.send(user);
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  } catch (err) {
    res.status(404).send("The user does not exist");
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, [
      "name",
      "email",
      "password",
      "biz",
      "cards",
      "block",
      "timeBlock",
      "admin",
    ])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
