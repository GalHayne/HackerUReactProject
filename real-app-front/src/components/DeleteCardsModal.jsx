import Card from "./card";

const DeleteCardsModal = ({ onClose, cards, msg }) => {

    const renderCards = cards.map((card) => {
        return (
            <div key={card._id} className="border rounded m-3 p-2 w-50 mx-auto">
                <h3>Card Name: {card.bizName}</h3>
                <h5>Phone: {card.bizPhone}</h5>
            </div>
        )
    })

    return (
        <div
            className="card-modal p-3 rounded"
            style={{
                backgroundColor: "#3f4144", position: "fixed", overflowY: "auto", width: "50rem", height: "50rem", textAlign: "center", top: "50%", left: "50%", color: "white", transform: "translate(-50%, -50%)",
            }}
        >
            <h1>{msg}</h1>

            <div className="mt-5">
                {renderCards}
            </div>
        </div>
    );
};

export default DeleteCardsModal;
