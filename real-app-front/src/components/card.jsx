import { useAuth } from "../context/auth.context";
import { Navigate, useNavigate } from "react-router-dom";

const Card = ({
  card: {
    _id,
    bizName,
    bizDescription,
    bizAddress,
    bizPhone,
    bizImage,
    user_id,
  },
  isFavoriteCard,
  MoveTofavorite,
  removeFromfavorite,
}) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleMoveTofavorite = async (card_id) => {
    MoveTofavorite(card_id);
  };

  const handleRemoveFromfavorite = async (card_id) => {
    removeFromfavorite(card_id);
  };

  return (
    <div className="card-desgin m-2" style={{ minWidth: "12rem", width: "15rem" }}>
      {!isFavoriteCard ? (
        <div
          className="bg-transparent text-warning position-relative end-0"
          title="add to favorite card"
          onClick={() => handleMoveTofavorite(_id)}
        >
          <i className="bi bi-star"></i>
        </div>
      ) : (
        <div
          className="bg-transparent text-warning position-relative end-0"
          title="remove from favorite cards"
          onClick={() => handleRemoveFromfavorite(_id)}
        >
          <i className="bi bi-star-fill"></i>
        </div>
      )
      }
      <div className="d-flex flex-row justify-content-around align-items-center">
        <img
          src={bizImage}
          className=" card-img-top my-4 p-2 w-50 rounded-circle"
          alt={bizName}
        />
        <h5 className="card-title">{bizName}</h5>
      </div>
      <div className="card-body">
        <p className="card-text">Description : {bizDescription}</p>
        <p className="card-text">Adress : {bizAddress}</p>
        <p className="card-text">Phone : {bizPhone}</p>
        {user.biz ? (
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={() => navigate(`/my-cards/edit/${_id}`)}>Edit</button>
            <button className="btn btn-danger" onClick={() => navigate(`/my-cards/delete/${_id}`)}>Delete</button>
          </div>
        ) : (
          <>
            {user_id === user._id ? (
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={() => navigate(`/my-cards/edit/${_id}`)}>Edit</button>
                <button className="btn btn-danget" onClick={() => navigate(`/my-cards/delete/${_id}`)}>Delete</button>
              </div>
            ) : (
              <div></div>
            )}
          </>
        )}
      </div>
    </div >
  );
};

export default Card;
