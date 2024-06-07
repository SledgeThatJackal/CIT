import React from 'react';

const ConfirmationModal = ({onDelete}) => {
    <div class="modal fade" id="containerConfirmationModal" tabindex="-1" aria-labelledby="containerConfirmationModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="containerConfirmationModalLabel">Are you sure you want to delete this?</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danager" onClick={onDelete}>Delete</button>
                </div>
            </div>
        </div>
    </div>
};

export default ConfirmationModal;