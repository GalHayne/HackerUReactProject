import { useEffect, useState } from "react";
import usersService from "../services/usersService";
import useDarkContext from "../hooks/useDarkModa-context";
import cardsService from "../services/cardsService";
import { toast } from "react-toastify";

const DeleteCardsModal = ({ onClose, msg, userIdSelect }) => {

    const { theme } = useDarkContext();

    const [cards, setCards] = useState();

    useEffect(() => {
        try {
            getCards();
        } catch (err) {
            console.log(err);
        }
    }, [])

    const handleDeleteCard = async (card_id) => {
        const res = await cardsService.deleteCard(card_id);
        getCards();
    }


    const getCards = async () => {
        const res = await usersService.getUserCards(userIdSelect);
        if (res.data.length !== 0) {
            setCards(res.data)
        } else {
            toast.success('The user has no more cards. This user can be deleted')
            onClose();
        }

    }

    const renderCards = cards?.map((card) => {
        return (
            <div key={card?._id} className="cardOnModal border rounded m-3 p-2 w-50 mx-auto">
                <h3>Card Name: {card?.bizName}</h3>
                <h5>Phone: {card?.bizPhone}</h5>
                <button
                    className={`btn btn-primary ${theme}`}
                    title="Delete card"
                    onClick={() => handleDeleteCard(card._id)}
                >
                    Delete
                </button>
            </div >
        )
    })

    return (
        <div
            className="card-modal p-3 rounded"
            style={{
                backgroundColor: "#3f4144", position: "fixed", overflowY: "auto", width: "50rem", height: "50rem", textAlign: "center", top: "50%", left: "50%", color: "white", transform: "translate(-50%, -50%)",
            }}
        >
            <h3 className="text-danger">{msg}</h3>
            <p>*To delete the user you will need to delete these cards first</p>

            <div className="mt-5">
                {renderCards}
            </div>
        </div>
    );
};

export default DeleteCardsModal;
