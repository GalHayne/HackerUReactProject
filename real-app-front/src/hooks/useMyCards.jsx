import { useState, useEffect } from "react";
import cardsService from "../services/cardsService";
import { toast } from "react-toastify";

export const useMyCards = () => {
  const [cards, setCards] = useState([]);

  const getCards = async () => {
    try {
      const { data } = await cardsService.getAll();
      setCards(data);
    } catch (err) {
      toast(err);
    }
  };

  useEffect(() => {

    getCards();
  }, []);

  return cards;
};
