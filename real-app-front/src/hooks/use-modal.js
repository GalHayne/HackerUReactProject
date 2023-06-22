import { useState } from "react";

const useModal = () => {
    const [modalStatus, setModalStatus] = useState(false);
    const openModal = () => setModalStatus(true);
    const closeModal = () => setModalStatus(false);

    return [modalStatus, openModal, closeModal];
};

export default useModal;
