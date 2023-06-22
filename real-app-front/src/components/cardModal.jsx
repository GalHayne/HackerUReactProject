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
                <button className="border-0 bg-transparent position-absolute m-1 top-0 end-0" title="exit full screen card" onClick={onClose}><i className="bi bi-fullscreen-exit"></i></button>
                <img
                    src={bizImage}
                    className=" card-img-top my-1 p-1 w-25 rounded-circle"
                    alt={bizName}
                />
                <h5 className="card-title">
                    {bizName}
                </h5>
            </div>
            <div className="card-body">
                <p className="card-text">
                    <span>Description</span> :{" "}
                    {bizDescription.length > 150
                        ? bizDescription.substring(0, 150) + "..."
                        : bizDescription}
                </p>
                <p className="card-text">
                    <span>Address</span> :
                    {bizAddress.length > 150
                        ? bizAddress.substring(0, 150) + "..."
                        : bizAddress}
                </p>
                <p className="card-text">
                    <span>Phone</span> :{" "}
                    {bizPhone.length > 150 ? bizPhone.substring(0, 150) + "..." : bizPhone}
                </p>
            </div>
            <hr />
            {user.biz ? (
                <div className="d-flex justify-content-around P-2">
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
        </div>
    )
}

export default CardModal;