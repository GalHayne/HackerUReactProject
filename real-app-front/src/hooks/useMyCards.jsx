import { useState, useEffect } from "react";
import cardsService from "../services/cardsService";

export const useMyCards = () => {
  const [cards, setCards] = useState([]);

  const getCards = async () => {
    try{
      const { data } = await cardsService.getAll();
      setCards(data);
    } catch(err){
      console.log(err);
    }
  };

  useEffect(() => {

    getCards();
  }, []);

  return cards;
};
