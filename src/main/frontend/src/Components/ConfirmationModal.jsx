import React from 'react';

const ConfirmationModal = ({onDelete}) => {
    return(
        <div className="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="confirmationModalLabel">Are you sure you want to delete this?</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger" onClick={onDelete} data-bs-dismiss="modal">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;