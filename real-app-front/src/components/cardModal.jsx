import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import useDarkContext from "../hooks/useDarkModa-context";

const CardModal = ({ onClose, card: {
    _id,
    bizName,
    bizDescription,
    bizAddress,
    bizPhone,
    bizImage,
    user_id,
} }) => {

    const { user } = useAuth()
    const { theme } = useDarkContext();
    const navigate = useNavigate();


    return (

        <div className="card-modal p-3 rounded" style={{
            backgroundColor: '#3f4144',
            position: "fixed",
            width: "50rem",
            textAlign: "center",
            top: "50%",
            left: "50%",
            color: 'white',
            transform: "translate(-50%, -50%)",
        }} >

            <div className="d-flex justify-content-around align-items-center">
                <button className="border-0 bg-transparent position-absolute m-1 top-0 end-0" title="exit full screen card" onClick={onClose}><i className="bi bi-fullscreen-exit text-light"></i></button>
                <img
                    src={bizImage}
                    className=" card-img-top my-1 p-1 w-25 rounded-circle"
                    alt={bizName}
                />
                <h5 className="card-title">
                    {bizName.length > 60
                        ? bizName.substring(0, 60) + "..."
                        : bizName}
                </h5>
            </div>
            <div className="card-body d-flex flex-column align-items-start">
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
                    {bizPhone.length > 100 ? bizPhone.substring(0, 100) + "..." : bizPhone}
                </p>
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
    )
}

export default CardModal;