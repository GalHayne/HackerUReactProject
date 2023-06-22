import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import useDarkContext from "../hooks/useDarkModa-context";
import useModal from "../hooks/use-modal";
import Modal from "./common/Modal";
import CardModal from "./cardModal";

const Card = ({ card,
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

  const [modalStatus, openModal, closeModal] = useModal();

  const { theme } = useDarkContext();

  const navigate = useNavigate();

  const handleMoveTofavorite = async (card_id) => {
    MoveTofavorite(card_id);
  };

  const handleRemoveFromfavorite = async (card_id) => {
    removeFromfavorite(card_id);
  };

  return (
    <div
      className={`card-desgin m-3 ${theme}`}
      style={{ minWidth: "12rem", width: "20rem", height: "20rem" }}
    >
      {!isFavoriteCard ? (
        <div className="d-flex justify-content-between">
          <i
            onClick={() => handleMoveTofavorite(_id)}
            style={{ cursor: "pointer" }}
            className="bi bi-star"
            title="add to favorite card"
          ></i>
          <i
            onClick={() => openModal()}
            style={{ cursor: "pointer" }}
            className="bi bi-fullscreen"
            title="open card in full screen"
          ></i>
        </div>
      ) : (
        <div className="d-flex justify-content-between">
          <i
            onClick={() => handleRemoveFromfavorite(_id)}
            style={{ cursor: "pointer" }}
            className="bi bi-star-fill"
            title="remove from favorite cards"
          ></i>
          <i
            onClick={() => openModal()}
            style={{ cursor: "pointer" }}
            className="bi bi-fullscreen"
            title="open card in full screen"
          ></i>
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center">
        <img
          src={bizImage}
          className=" card-img-top my-1 p-1 w-50 rounded-circle"
          alt={bizName}
        />
        <h5 className="card-title">
          {bizName.length > 12 ? bizName.substring(0, 12) + "..." : bizName}
        </h5>
      </div>
      <div className="card-body">
        <p className="card-text">
          <span>Description</span> :{" "}
          {bizDescription.length > 32
            ? bizDescription.substring(0, 32) + "..."
            : bizDescription}
        </p>
        <p className="card-text">
          <span>Address</span> :
          {bizAddress.length > 32
            ? bizAddress.substring(0, 32) + "..."
            : bizAddress}
        </p>
        <p className="card-text">
          <span>Phone</span> :{" "}
          {bizPhone.length > 32 ? bizPhone.substring(0, 32) + "..." : bizPhone}
        </p>
      </div>
      <hr />
      {user.biz ? (
        <div className="d-flex justify-content-between P-2">
          <button
            className={`btn btn-primary ${theme}`}
            onClick={() => navigate(`/my-cards/edit/${_id}`)}
          >
            Edit
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/my-cards/delete/${_id}`)}
          >
            Delete
          </button>
        </div>
      ) : (
        <>
          {user_id === user._id ? (
            <div className="d-flex justify-content-between P-2">
              <button
                className={`btn btn-primary ${theme}`}
                onClick={() => navigate(`/my-cards/edit/${_id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate(`/my-cards/delete/${_id}`)}
              >
                Delete
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </>
      )}
      <Modal modalStatus={modalStatus} onClose={closeModal}>
        <CardModal onClose={closeModal} user={user} card={card} />
      </Modal>
    </div>
  );
};

export default Card;
