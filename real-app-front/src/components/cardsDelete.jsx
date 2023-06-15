import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cardsService from "../services/cardsService";
import { toast } from "react-toastify";

const CardsDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteCard = async () => {
      const res = await cardsService.deleteCard(id);
      toast.success(`${res.data.bizName}'s card was delete successfully`)
      navigate("/my-cards");
    };

    deleteCard();
  }, [id, navigate]);

  return null;
};

export default CardsDelete;
