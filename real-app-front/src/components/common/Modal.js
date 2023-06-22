import { useEffect } from "react";
import { createPortal } from "react-dom";
import classes from "../css/Modal.module.css";


const Modal = ({ modalStatus, children, onClose }) => {

    useEffect(() => {
        document.body.dataset.noscroll = modalStatus;
    }, [modalStatus]);

    const portalDiv = document.getElementById("portal");

    const handleCloseModal = () => {
        onClose()
    }

    return (modalStatus &&
        createPortal(
            <>
                <div className={classes.overlay} onClick={() => handleCloseModal()} />
                <div className={classes.modal} data-open={modalStatus}>
                    {children}
                </div>
            </>,
            portalDiv
        ))
};

export default Modal;
