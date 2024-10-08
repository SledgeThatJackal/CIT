import React, { useState, useEffect, lazy } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import { Table, Container, Accordion } from 'react-bootstrap';

import PaginationComponent from '../General/Pagination';

import SearchComponent from '../General/SearchComponent';
import ReadRow from '../General/ReadRow';

import TItemTable from '../TanStack/ItemTable';

const ConfirmationModal = lazy(() => import("../General/ConfirmationModal"));
const EditRow = lazy(() => import("../General/EditRow"));

import { ItemResponse, Item, EditData, ItemFormSchemaType, ItemFormSchema } from '../../Types/Item';

function ItemTable(){
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [itemData, setItemData] = useState<Item[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [deleteId, setDeleteId] = useState<number>(-1);
    const [editId, setEditId] = useState<number | undefined>(undefined);
    const [editData, setEditData] = useState<EditData>();

    const [message, setMessage] = useState<string | undefined>(undefined);
    const [action, setAction] = useState<() => Promise<void>>();

    // Modal Controls
    const [show, setShow] = useState(false);

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    const methods = useForm<ItemFormSchemaType>({
        defaultValues: {},
        resolver: zodResolver(ItemFormSchema),
    });

    useEffect(() => {
        fetchData();
        setEditId(-1);
    }, [currentPage, searchTerm]);

    const fetchData = async () => {
        try{
            const url = `/api/item/c?page=${currentPage}&search=${searchTerm}`;
            const response = await axios.get<ItemResponse>(url);

            setItemData(response.data.content);

            setTotalPages(response.data.totalPages > 0 ? response.data.totalPages : 1);

        } catch (error){
            console.error('Request failed: ', error);
        }
    };

    const onSubmit = async (data: ItemFormSchemaType) => {
        await axios.patch(`/api/item/edit`, data);

        setEditId(-1); // sets the value to -1 here, so the currently edited row is no longer in edit mode
        fetchData();
    };

    const handleDelete = async () => {
        try{
            await axios.delete(`/api/item/delete?id=${deleteId}`);
            setItemData(itemData.filter(item => item.id !== deleteId));
        } catch (error){
            console.error('Error deleteing entry: ', error);
        }
    };

    const handleLinkDelete = async (index: number, id?: number) => {
        try{
            await axios.delete(`/api/link?id=${id}`);

            fetchData();
            return true;
        } catch (error) {
            console.error('Error deleting link: ', error);
            return false;
        }
    };

    const handleEdit = async (itemId: number) => {
        try{
            const response = (await axios.get<EditData>(`/api/item/edit?itemId=${itemId}`)).data;;

            setEditData(response);
            setEditId(response.itemDTO.item.id);
        } catch (error){
            console.error('Error fetching item: ', error);
        }
    };

    const setupDelete = (action: () => Promise<void>, message: string) => {
        setAction(() => action);
        setMessage(message);

        handleOpen();
    };

    return(
        <Container fluid>
            <SearchComponent onSearch={ setSearchTerm } />
            <ConfirmationModal show={ show } handleClose={ handleClose } onDelete={ action } message={ message } />

            <FormProvider { ...methods }>
                <form onSubmit={ methods.handleSubmit( onSubmit ) }>
                    <Table hover bordered variant="secondary" className="mx-auto" style={{borderRadius: '8px', overflow: 'hidden'}}>
                        <thead>
                            <tr className='table-secondary'>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Tag(s)</th>
                                <th scope="col"><NavLink to="/item/form" className="btn btn-primary btn-sm" role="button">Create</NavLink></th>
                            </tr>
                        </thead>
                        
                        <Accordion as="tbody" className="table-group-divider">
                                {itemData.length > 0 ? 
                                    itemData.map((item, index) => (
                                        <React.Fragment>
                                            { editId === item.id ? (
                                                <EditRow key='editRow' itemDTO={ editData?.itemDTO } containerDTOs={ editData?.containerDTOs } setupDelete={ setupDelete } handleDelete={ handleLinkDelete } cancelEdit={ setEditId } />
                                            ) : (
                                                <ReadRow key='readRow' item={ item } index={ index } onDelete={ (id) => { setDeleteId(id); setupDelete( handleDelete, "Are you sure you want to delete this item?"); } } onEdit={ handleEdit } />
                                            )}
                                        </React.Fragment>
                                )) : (
                                    <div>
                                        No items match the requested search term ({searchTerm})
                                    </div>
                                )}
                        </Accordion>
                    </Table>
                </form>
            </FormProvider>

            {itemData.length !== 0 && (
                <PaginationComponent currentPage={ currentPage } totalPages={ totalPages } onPageChange={ setCurrentPage } />
            )}

            <TItemTable />

        </Container>
    );
}

export default ItemTable;