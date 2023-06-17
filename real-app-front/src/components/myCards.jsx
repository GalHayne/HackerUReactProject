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

  const [favoriteCardsId,setFavoriteCardsId] =useState([]);

  const { user } = useAuth();

  useEffect(() => {
    getFavoriteCardsId();
  }, [])

  const getFavoriteCardsId = async () => {
    try {
      const res = await axios.get(`http://localhost:3900/api/users/FavoriteCard/${user._id}`,{
      })
      setFavoriteCardsId(res.data.favoriteCard);
    } catch (error) {
        toast.error('server error cant favorite cards')
      }
    }
    
    const MoveTofavorite = async (card_id) => {
      try {
        await axios.put(`http://localhost:3900/api/users/addFavoriteCard/${card_id}/${user._id}`,{
        })
        toast.success(`The card move to favorite`)
        getFavoriteCardsId();
      
    } catch (error) {   
      toast.error('server error cant move to favorite cards')
    }
  }

    const removeFromfavorite = async (card_id) => {
      try {
        await axios.put(`http://localhost:3900/api/users/removeFavoriteCard/${card_id}/${user._id}`,{
        })
        toast.success(`The card remove from favorite`)
        getFavoriteCardsId();
      
    } catch (error) {   
      toast.error('server error cant remove this card from favorite cards')
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
      <div className="d-flex justify-content-end mb-3" >
        <button type="button" className="btn btn-primary w-25">Show only favorite cards </button>
      </div>

      <div className="d-flex justify-content-between m-3">
        {!cards.length ? (
          <p>no cards...</p>
        ) : (
          cards.map((card) => {
            let isFavoriteCard = false;
           favoriteCardsId.some(favoriteCardId => {
            if (favoriteCardId === card._id){
              isFavoriteCard = true;
            }
           })
          
            return <Card key={card._id} card={card} isFavoriteCard={isFavoriteCard} MoveTofavorite={MoveTofavorite} removeFromfavorite={removeFromfavorite}
          />})
        )}

      </div>
    </>
  );
};

export default MyCards;
