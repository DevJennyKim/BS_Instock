import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import "./DeletePopup.scss";


ReactModal.setAppElement("#root");

function DeletePopup({
    isOpen,
    onClose,
    onConfirm,
    title,
    content,
}) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal"
            overlayClassName="modal-overlay"
        >
        <h2>{title}</h2>
        <img src="src/assets/Icons/close-24px.svg" alt="close-icon" className="modal__close-button" aria-label="Close" onClick={onClose}></img>
        <div className="modal__content">{content}</div>
        <div className="modal__buttons">
          <button onClick={onClose} className="modal__button modal__button--cancel">
            Cancel
          </button>
          <button onClick={onConfirm} className="modal__button modal__button--confirm">
            Delete
          </button>
        </div>
        </ReactModal>

    );

}

DeletePopup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
};

export default DeletePopup;