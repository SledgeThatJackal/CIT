import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react';

import { Modal, Button } from 'react-bootstrap';
import { RefMethod } from '../../Types/General';

type ConfirmationModalProp = {
    show: boolean;
    handleClose: () => void
    onDelete?: () => Promise<void>;
    message?: string;
};

const ConfirmationModal = (props: ConfirmationModalProp) => {
    const { show, handleClose, onDelete, message } = props;


    // useImperativeHandle(ref, () => {
    //     return{
    //         showModal(){
    //             if(modalRef.current){
    //                 const modal = new Modal(modalRef.current);

    //                 modal.show();
    //             }
    //         }
    //     }
    // });

    return(
        // <div className="modal fade" id="confirmationModal" tabIndex={-1} aria-labelledby="confirmationModalLabel" aria-hidden="true" ref={ modalRef }>
        //     <div className="modal-dialog">
        //         <div className="modal-content">
        //             <div className="modal-header">
        //                 <h1 className="modal-title fs-5" id="confirmationModalLabel">Delete</h1>
        //                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        //             </div>
        //             <div className="modal-body">
        //                 <p>
        //                     { message }
        //                 </p>
        //             </div>
        //             <div className="modal-footer">
        //                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        //                 <button type="button" className="btn btn-danger" onClick={ onDelete } data-bs-dismiss="modal">Delete</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { message }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ handleClose }>
                    Cancel
                </Button>

                <Button variant="danger" onClick={ () => {
                    if(onDelete){
                        onDelete();
                    }

                    handleClose();
                } }>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;