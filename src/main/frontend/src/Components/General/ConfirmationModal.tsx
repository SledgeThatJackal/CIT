import React, { forwardRef, useRef, useImperativeHandle } from 'react';

import { Modal } from 'bootstrap';
import { RefMethod } from '../../Types/General';

type ConfirmationModalProp = {
    onDelete?: () => Promise<void>;
    message?: string;
};

const ConfirmationModal = forwardRef<RefMethod, ConfirmationModalProp>((props, ref) => {
    const { onDelete, message } = props;
    const modalRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => {
        return{
            showModal(){
                if(modalRef.current){
                    const modal = new Modal(modalRef.current);

                    modal.show();
                }
            }
        }
    });

    return(
        <div className="modal fade" id="confirmationModal" tabIndex={-1} aria-labelledby="confirmationModalLabel" aria-hidden="true" ref={ modalRef }>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="confirmationModalLabel">Delete</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>
                            { message }
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={ onDelete } data-bs-dismiss="modal">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ConfirmationModal;