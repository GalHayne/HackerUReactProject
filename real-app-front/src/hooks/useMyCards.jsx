import { useState, useEffect } from "react";
import cardsService from "../services/cardsService";

export const useMyCards = () => {
  const [cards, setCards] = useState([]);


  useEffect(() => {
    const getCards = async () => {
      const { data } = await cardsService.getAll();
      console.log(data);
      setCards(data);
    };

    getCards();
  }, []);

  return cards;
};
