import { Link } from "react-router-dom";
import PageHeader from "./common/pageHeader";
import { useMyCards } from "../hooks/useMyCards";
import Card from "./card";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";


const MyCards = () => {
  const cards = useMyCards();

  const [favoriteCards,setFavoriteCards] =useState([]);

  const { user } = useAuth();

  useEffect(() => {
    getFavoriteCards();
  }, [])

  const getFavoriteCards = async () => {
    try {
      const res = await axios.get(`http://localhost:3900/api/users/FavoriteCard/${user._id}`,{
      })
      setFavoriteCards(res.data.favoriteCard);
    } catch (error) {
        toast.error('server error cant favorite cards')
      }
    }
    
    const MoveTofavorite = async (card_id) => {
      try {
        await axios.put(`http://localhost:3900/api/users/addFavoriteCard/${card_id}/${user._id}`,{
        })
      toast.success(`The card move to favorite`)
      getFavoriteCards();
      toast.error('server error cant move this card favorite cards')
      
    } catch (error) {
        
    }
  }

  return (
    <>
      <PageHeader
        title="My Cards"
        description="your cards are in the list below"
      />

      <div className="row">
        <Link to="/create-card">Create a New Card</Link>
      </div>

      <div className="row">
        {!cards.length ? (
          <p>no cards...</p>
        ) : (
          cards.map((card) => {
            let isFavoriteCard = false;
           favoriteCards.some(favoriteCard => {
            if (favoriteCard._id === card._id){
              isFavoriteCard = true;
            }
           })
          
            return <Card key={card._id} card={card} isFavoriteCard={isFavoriteCard} MoveTofavorite={MoveTofavorite}
          />})
        )}

      </div>
    </>
  );
};

export default MyCards;
