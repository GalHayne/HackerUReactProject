import PageHeader from "./common/pageHeader";
import { useMyCards } from "../hooks/useMyCards";
import Card from "./card";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";
import usersService from "../services/usersService";
import { Navigate, useNavigate } from "react-router-dom";
import useDarkContext from "../hooks/useDarkModa-context";
import Carousel from 'react-elastic-carousel';
import TypeDisplay from "./typeDisplay";

const MyCards = () => {

  const [onlyFavorite, setOnlyFavorite] = useState(false);

  const [favoriteCards, setFavoriteCards] = useState([]);

  const { user } = useAuth();

  const cards = useMyCards();

  const { theme } = useDarkContext();

  const { galleryStyle, toogleStyle } = useDarkContext();

  const navigate = useNavigate();

  useEffect(() => {
    getFavoriteCards();
  }, [onlyFavorite])

  const getFavoriteCards = async () => {
    if (user) {
      const res = usersService.getFavoriteCards(user);
      res.then(response => setFavoriteCards(response.data.favoriteCard))
        .catch(err => { toast.error('server error cant favorite cards') })
    }
  }

  const MoveTofavorite = async (card_id) => {
    try {
      await usersService.addCardFromUserToFavorite(card_id, user._id)
      toast.success(`The card move to favorite`)
      getFavoriteCards();

    } catch (error) {
      toast.error('server error cant move to favorite cards')
    }
  }

  const removeFromfavorite = async (card_id) => {
    try {
      await usersService.removeCardFromFavoriteToUser(card_id, user._id);
      toast.success(`The card remove from favorite`)
      getFavoriteCards();
    } catch (error) {
      toast.error('server error cant remove this card from favorite cards')
    }
  }

  const handleGalleryStyleChange = () => {
    toogleStyle(prev => !prev)
  }

  const breakPoints = [
    { width: 400, itemsToShow: 1 },
    { width: 800, itemsToShow: 2 },
    { width: 1100, itemsToShow: 3 },
    { width: 1400, itemsToShow: 4 },
    { width: 1800, itemsToShow: 5 },
  ]

  const renderCards = !cards?.length ? (<p>no cards...</p>)
    : onlyFavorite === false ? (
      cards.map((card) => {
        let isFavoriteCard = false;
        favoriteCards?.some(favoriteCard => {
          if (favoriteCard?._id === card?._id) {
            isFavoriteCard = true;
          }
        })

        return <Card key={card._id} card={card} isFavoriteCard={isFavoriteCard} MoveTofavorite={MoveTofavorite} removeFromfavorite={removeFromfavorite}
        />
      })
    )
      : (
        favoriteCards.map((card) => {
          let isFavoriteCard = false;
          favoriteCards.some(favoriteCard => {
            if (favoriteCard._id === card._id) {
              isFavoriteCard = true;
            }
          });

          return <Card key={card._id} card={card} isFavoriteCard={isFavoriteCard} MoveTofavorite={MoveTofavorite} removeFromfavorite={removeFromfavorite}
          />
        })
      )


  return (
    <>
      <PageHeader
        title={!onlyFavorite ? "My Cards" : 'Favorite Cards'}
        description={cards.length ? !onlyFavorite ? "You can see all the business cards that users have uploaded to the site. You can see the professional's contact details and directions. You can mark the favorites cards and only the favorites cards can be displayed. In addition, you can add a new business card by clicking on Add new card." : "your favorite cards are in the list below" : 'Click on Add new card to add new card'}
        note={'Please note that every new business card that is uploaded to the site is carefully checked by the site manager, if there is a defective card, the manager deletes it.'}
      />

      <div className="d-flex justify-content-between mb-3" >
        {(user.biz || user.admin) && <button type="button" className={`btn btn-primary ${theme}`} onClick={() => navigate('/create-card')} title="Add new card">Add new card</button>}
        {!onlyFavorite ? <button disabled={favoriteCards?.length === 0} type="button" style={{ minWidth: "5rem", width: "10rem" }} className="btn btn-secondary" title="show favorite cards" onClick={() => setOnlyFavorite((prev) => !prev)}>Favorite cards </button>
          :
          <button type="button" title="show all cards" style={{ minWidth: "5rem", width: "10rem" }} className="btn btn-secondary" onClick={() => setOnlyFavorite((prev) => !prev)}>All cards </button>
        }
      </div>

      {<TypeDisplay setCardGalleryStyle={handleGalleryStyleChange} galleryStyle={galleryStyle} />}

      {
        galleryStyle ?
          <div className="d-flex justify-content-center flex-wrap">
            {renderCards}
          </div>
          :
          <div className="text-center mt-5">
            {cards?.length !== 0 ? <Carousel breakPoints={breakPoints}>
              {renderCards}
            </Carousel> : <p>no cards...</p>}
          </div>
      }
    </>
  );
};

export default MyCards;
