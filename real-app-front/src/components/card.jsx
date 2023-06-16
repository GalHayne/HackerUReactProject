import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const Card = ({
  card: { _id, bizName, bizDescription, bizAddress, bizPhone, bizImage, user_id },
  isFavoriteCard,
  MoveTofavorite
}) => {

  const { user } = useAuth();

  const handleMoveTofavorite = async (card_id) => {
    MoveTofavorite(card_id)
  }

  return (
    <div className="card" style={{ width: "18rem" }}>
      {!isFavoriteCard ? <div className="bg-transparent position-absolute end-0 m-2" title="add to favorite card" onClick={() => handleMoveTofavorite(_id)}><i className="bi bi-star"></i></div>:
        <div className="bg-transparent position-absolute text-warning end-0 m-2" title="add to favorite card"><i className="bi bi-star-fill"></i></div>
      }
      <img src={bizImage} className="card-img-top my-4 p-2 rounded-circle" alt={bizName} />
      <div className="card-body">
        <h5 className="card-title">{bizName}</h5>
        <p className="card-text">{bizDescription}</p>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">{bizAddress}</li>
          <li className="list-group-item">{bizPhone}</li>
        </ul>

        {user.biz ?
          <>
            <Link to={`/my-cards/edit/${_id}`} className="card-link">
              edit
            </Link>
            <Link to={`/my-cards/delete/${_id}`} className="card-link">
              delete
            </Link>
          </>
          :
          <>
            {user_id === user._id ?
              <div>
                <Link to={`/my-cards/edit/${_id}`} className="card-link">
                  edit
                </Link>
                <Link to={`/my-cards/delete/${_id}`} className="card-link">
                  delete
                </Link>
              </div> : <div></div>}
          </>
        }

      </div>
    </div>
  );
};

export default Card;
