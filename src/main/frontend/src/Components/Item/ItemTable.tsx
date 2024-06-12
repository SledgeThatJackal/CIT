import React, {useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import PaginationComponent from '../Pagination';
import ConfirmationModal from '../ConfirmationModal';
import SearchComponent from '../SearchComponent';

import { ItemResponse, ItemDTO, ItemCreationDTO } from '../../Types/Item';

function ItemTable(){
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [itemData, setItemData] = useState<ItemDTO[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [deleteId, setDeleteId] = useState<number>(-1);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try{
                const url = `/item/page?page=${currentPage}&search=${searchTerm}`;
                const response = await axios.get<ItemResponse>(url);

                setItemData(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error){
                console.log('Request failed: ', error);
            }
        };

        fetchData();
    }, [currentPage, searchTerm]);

    const handleDelete = async () => {
        try{
            await axios.delete(`/item/delete?id=${deleteId}`);
            setItemData(itemData.filter(itemDTO => itemDTO.item.id !== deleteId));
        } catch (error){
            console.error('Error deleteing entry: ', error);
        }
    };

    const handleEdit = async (itemId: number) => {
        try{
            const response = (await axios.get<ItemCreationDTO>(`/api/item/edit?itemId=${itemId}`)).data;

            navigate('/item/form', {state: { response }});
        } catch (error){
            console.error('Error fetching item: ', error);
        }
    };

    return(
        <div>
            <SearchComponent onSearch={setSearchTerm} />
            <ConfirmationModal onDelete={handleDelete} />

            <table className="table table-secondary table-hover table-striped">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col"><NavLink to="/item/form" className="btn btn-primary btn-sm" role="button">Create</NavLink></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {itemData.map((itemDTO, index) => (
                        <React.Fragment>
                            <tr key={`item-${index}`} data-bs-toggle="collapse" data-bs-target={`#containers-${itemDTO.item.id}`} aria-expanded={false} aria-controls={`containers-${itemDTO.item.id}`}>
                            <th scope="row">{itemDTO.item.id}</th>
                            <td>{itemDTO.item.name}</td>
                            <td>{itemDTO.item.description}</td>
                            <td>
                                <button type="button" className="btn btn-info btn-small" onClick={() => handleEdit(itemDTO.item.id)}>Edit</button>
                            </td>
                            <td>
                                <button type="button" onClick={() => setDeleteId(itemDTO.item.id)} className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#confirmationModal">Delete</button>
                            </td>
                        </tr>
                        {itemDTO.containers.length > 0 && (
                            <tr>
                                <td colSpan={5} className="collapse" id={`containers-${itemDTO.item.id}`}>
                                    <table className="table table-info table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">id</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Scanner ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {itemDTO.containers.map((container, containerIndex) => (
                                                <tr key={`container-${index}-${containerIndex}`}>
                                                    <th scope="row">{container.id}</th>
                                                    <td>{container.name}</td>
                                                    <td>{container.description}</td>
                                                    <td>{container.scannerId}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
}

export default ItemTable;