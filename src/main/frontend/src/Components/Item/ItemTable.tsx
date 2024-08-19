import React, {useState, useEffect} from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";


import PaginationComponent from '../General/Pagination';
import ConfirmationModal from '../General/ConfirmationModal';
import SearchComponent from '../General/SearchComponent';
import ReadRow from '../General/ReadRow';
import EditRow from '../General/EditRow';

import { ItemResponse, ItemDTO, ItemCreationDTO, ItemFormSchemaType, ItemFormSchema } from '../../Types/Item';

function ItemTable(){
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [itemData, setItemData] = useState<ItemDTO[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [deleteId, setDeleteId] = useState<number>(-1);
    const [editId, setEditId] = useState<number | undefined>(undefined);
    const [itemCreationDTO, setItemCreationDTO] = useState<ItemCreationDTO>();

    const methods = useForm<ItemFormSchemaType>({
        defaultValues: {},
        resolver: zodResolver(ItemFormSchema),
    });

    useEffect(() => {
        fetchData();
    }, [currentPage, searchTerm]);

    const fetchData = async () => {
        try{
            const url = `/api/item?page=${currentPage}&search=${searchTerm}`;
            const response = await axios.get<ItemResponse>(url);

            setItemData(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error){
            console.error('Request failed: ', error);
        }
    };

    const onSubmit = async (data: ItemFormSchemaType) => {
        axios.patch(`/api/item/edit`, data);

        setEditId(-1); // sets the value to -1 here, so the currently edited row is no longer in edit mode
    };

    const handleDelete = async () => {
        try{
            await axios.delete(`/api/item/delete?id=${deleteId}`);
            setItemData(itemData.filter(itemDTO => itemDTO.item.id !== deleteId));
        } catch (error){
            console.error('Error deleteing entry: ', error);
        }
    };

    const handleLinkDelete = async (index: number, id?: number) => {
        try{
            await axios.delete(`/api/link?id=${id}`);
            return true;
        } catch (error) {
            console.error('Error deleting link: ', error);
            return false;
        }
    };

    const handleEdit = async (itemId: number) => {
        try{
            const response = (await axios.get<ItemCreationDTO>(`/api/item/edit?itemId=${itemId}`)).data;

            setItemCreationDTO(response);
            setEditId(response.item.id);
        } catch (error){
            console.error('Error fetching item: ', error);
        }
    };

    return(
        <div>
            <SearchComponent onSearch={ setSearchTerm } />
            <ConfirmationModal onDelete={ handleDelete } />

            <FormProvider {...methods}>
                <form onSubmit={ methods.handleSubmit(onSubmit) }>
                    <table className="table table-secondary table-hover">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Tag(s)</th>
                                <th scope="col"><NavLink to="/item/form" className="btn btn-primary btn-sm" role="button">Create</NavLink></th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {itemData.map((itemDTO, index) => (
                                <React.Fragment>
                                    { editId === itemDTO.item.id ? (
                                        <EditRow key='editRow' itemCreationDTO={ itemCreationDTO } onSubmit={ onSubmit } handleDelete={ handleLinkDelete } cancelEdit={ setEditId } />
                                    ) : (
                                        <ReadRow key='readRow' itemDTO={ itemDTO } index={ index } onDelete={ setDeleteId } onEdit={ handleEdit } />
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </form>
            </FormProvider>

            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
}

export default ItemTable;