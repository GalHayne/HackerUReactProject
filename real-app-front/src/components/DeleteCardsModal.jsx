import Card from "./card";

const DeleteCardsModal = ({ onClose, cards, msg }) => {

    const renderCards = cards.map((card) => {
        return (
            <div key={card._id} className="border rounded m-2 p-2">
                <h3>Card Name: {card.bizName}</h3>
                <h5>Phone: {card.bizPhone}</h5>
            </div>
        )
    })

    return (
        <div
            className="card-modal p-3 rounded"
            style={{
                backgroundColor: "#3f4144", position: "fixed", width: "50rem", textAlign: "center", top: "50%", left: "50%", color: "white", transform: "translate(-50%, -50%)",
            }}
        >
            <h1>{msg}</h1>

            <div className="d-flex justify-content-center flex-wrap">
                {renderCards}
            </div>
        </div>
    );
};

export default DeleteCardsModal;
