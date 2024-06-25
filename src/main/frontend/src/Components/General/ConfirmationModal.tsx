import React from 'react';

type confirmationModalProp = {
    onDelete: () => Promise<void>;
};

const ConfirmationModal = ({onDelete}: confirmationModalProp) => {
    return(
        <div className="modal fade" id="confirmationModal" tabIndex={-1} aria-labelledby="confirmationModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="confirmationModalLabel">Are you sure you want to delete this?</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={onDelete} data-bs-dismiss="modal">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;