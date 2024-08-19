import React, {useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import PaginationComponent from '../General/Pagination';
import ConfirmationModal from '../General/ConfirmationModal';
import EditModal from '../General/EditModal';
import SearchComponent from '../General/SearchComponent';
import ReadRow from '../General/ReadRow';

import { ItemResponse, ItemDTO, ItemCreationDTO } from '../../Types/Item';

function ItemTable(){
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [itemData, setItemData] = useState<ItemDTO[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [deleteId, setDeleteId] = useState<number>(-1);
    const [editData, setEditData] = useState<ItemCreationDTO | undefined>(undefined);

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

    const handleDelete = async () => {
        try{
            await axios.delete(`/api/item/delete?id=${deleteId}`);
            setItemData(itemData.filter(itemDTO => itemDTO.item.id !== deleteId));
        } catch (error){
            console.error('Error deleteing entry: ', error);
        }
    };

    const handleEdit = async (itemId: number) => {
        try{
            const response = (await axios.get<ItemCreationDTO>(`/api/item/edit?itemId=${itemId}`)).data;

            setEditData(response);
        } catch (error){
            console.error('Error fetching item: ', error);
        }
    };

    return(
        <div>
            <SearchComponent onSearch={ setSearchTerm } />
            <ConfirmationModal onDelete={ handleDelete } />\
            <EditModal data={ editData } onDataUpdate={ fetchData } />

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
                        <ReadRow itemDTO={ itemDTO } index={ index } onDelete={ setDeleteId } onEdit={ handleEdit } />
                    ))}
                </tbody>
            </table>

            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
}

export default ItemTable;