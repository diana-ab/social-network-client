import "../../styles/DeletePostModal.css";
import CustomButton from "../../../../shared/ui/button/CustomButton.jsx";

function DeletePostModal({isOpen, onClose, onConfirm}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="delete-post-modal__overlay" onClick={onClose}>
            <div
                className="delete-post-modal"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="delete-post-modal__close"
                    onClick={onClose}
                    aria-label="Close delete modal"
                >
                    ×
                </button>

                <h3 className="delete-post-modal__title">Delete post?</h3>

                <p className="delete-post-modal__text">
                    Once you delete this post, it cannot be restored.
                </p>

                <div className="delete-post-modal__actions">
                    <CustomButton
                        text="Go Back"
                        onClick={onClose}
                        variant="secondary"
                        size="small"
                        fullWidth={false}
                        className="delete-post-modal__back-button"
                    />

                    <CustomButton
                        text="Yes, Delete"
                        onClick={onConfirm}
                        variant="primary"
                        size="small"
                        fullWidth={false}
                        className="delete-post-modal__confirm-button"
                    />
                </div>
            </div>
        </div>
    );
}

export default DeletePostModal;