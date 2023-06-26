import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import useDarkContext from "../hooks/useDarkModa-context";

const CardModal = ({
  onClose,
  card: {
    _id,
    bizName,
    bizDescription,
    bizAddress,
    bizPhone,
    bizImage,
    user_id,
    createdAt,
  },
}) => {
  const { user } = useAuth();
  const { theme } = useDarkContext();
  const navigate = useNavigate();

  const getFullDate = (date) => {
    const fullDate =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " - " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    return fullDate;
  };

  const modalStyle = {
    backgroundColor: "#3f4144",
    position: "fixed",
    width: "50rem",
    textAlign: "center",
    top: "50%",
    left: "50%",
    color: "white",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div className="card-modal p-3 rounded" style={modalStyle}>
      <div className="d-flex justify-content-around align-items-center">
        <button
          className="border-0 bg-transparent position-absolute m-1 top-0 end-0"
          title="exit full screen card"
          onClick={onClose}
        >
          <i className="bi bi-fullscreen-exit text-light"></i>
        </button>
        <img
          src={bizImage}
          className=" card-img-top my-1 p-1 w-25 rounded-circle"
          alt={bizName}
        />

        <h5 className="card-title">
          Name:
          {bizName.length > 60 ? bizName.substring(0, 60) + "..." : bizName}
        </h5>
      </div>
      <hr></hr>
      <div className="card-body d-flex justify-content-around align-items-center">
        <div>
          <p className="card-text">
            <span className="bold">Description: </span>
            {bizDescription.length > 100
              ? bizDescription.substring(0, 100) + "..."
              : bizDescription}
          </p>
          <p className="card-text">
            <span className="bold">Address: </span>
            {bizAddress.length > 100
              ? bizAddress.substring(0, 100) + "..."
              : bizAddress}
          </p>
          <p className="card-text">
            <span className="bold">Phone: </span>
            {bizPhone.length > 100
              ? bizPhone.substring(0, 100) + "..."
              : bizPhone}
          </p>
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3388.0085710303856!2d34.80526427619952!3d31.879183629325848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502b7720d94b1fd%3A0xb2e50a28d80c30c3!2sSderot%20Max%20Ve&#39;Ampro%20Shein%208%2C%20Rehovot!5e0!3m2!1sen!2sil!4v1687800309789!5m2!1sen!2sil"
            width="150"
            height="150"
            style={{border:"0", borderRadius: '15px', padding: '5px'}}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div>
          <span className="bold">Time created</span>{" "}
          <p>{getFullDate(new Date(createdAt))}</p>
        </div>
      </div>
      <hr />
      {user.biz ? (
        <div className="d-flex justify-content-between P-2">
          <button
            title="edit card"
            className={`btn btn-primary ${theme}`}
            onClick={() => navigate(`/my-cards/edit/${_id}`)}
          >
            Edit
          </button>
          <button
            title="delete card"
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
    </div>

    //     <div className="container" style={modalStyle}>
    //       <div class="row">
    //     <div class="col-sm-4">col-sm-4</div>
    //     <div class="col-sm-4">col-sm-4</div>
    //     <div class="col-sm-4">col-sm-4</div>
    //   </div>
    //   <div class="row">
    //     <div class="col-sm">col-sm</div>
    //     <div class="col-sm">col-sm</div>
    //     <div class="col-sm">col-sm</div>
    //   </div>
    //   <div class="row">
    //     <div class="col-sm">col-sm</div>
    //     <div class="col-sm">col-sm</div>
    //     <div class="col-sm">col-sm</div>
    //   </div>
    //     </div>
  );
};

export default CardModal;
