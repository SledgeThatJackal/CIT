import React, { useRef } from 'react';

import ItemForm from '../Item/ItemForm';

import { ItemCreationDTO } from '../../Types/Item';

type editModalProp = {
    data?: ItemCreationDTO;
    onDataUpdate: () => Promise<void>;
};

const EditModal = ({ data, onDataUpdate }: editModalProp) => {
    const submitRef = useRef<HTMLButtonElement>(null);

    const handleDataUpdate = () => {
        submitRef.current?.click();

        setTimeout(() => {
            onDataUpdate(); 
        }, 50);
    };

    return(
        <div className="modal fade" id="editModal" tabIndex={-1} aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="editModalLabel">Edit</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className='modal-body'>
                        <ItemForm itemCreationDTO={ data } reference={ submitRef } />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onClick={ handleDataUpdate } className="btn btn-info" data-bs-dismiss="modal">Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;