import React, {useState, useEffect} from 'react';
import axios from 'axios';

import PaginationComponent from '../Pagination.jsx';
import ConfirmationModal from '../ConfirmationModal.jsx';

function ContainerTable(){
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [containerData, setContainerData] = useState([]);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try{
                const url = `/container/page?page=${currentPage}`;
                const response = await axios.get(url);

                setContainerData(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error){
                console.log('Request failed: ', error);
            }
        };

        fetchData();
    }, [currentPage]);

    const handleDelete = async () => {
        try{
            await axios.delete(`/container/delete?id=${deleteId}`);
            setContainerData(containerData.filter(container => container.id !== deleteId));
        } catch (error){
            console.error('Error deleteing entry: ', error);
        }
    };

    return (
        <div>
            <table className="table table-secondary table-hover">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Scanner ID</th>
                        <th scope="col">Parent Container ID</th>
                        <th scope="col"><a className="btn btn-primary btn-sm" href="/container/create" role="button">Create</a></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    {containerData.map((container) => (
                        <tr key={`container-${container.id}`}>
                            <th scope="row">{container.id}</th>
                            <td>{container.name}</td>
                            <td>{container.description}</td>
                            <td>{container.scannerId}</td>
                            <td>{container.parentContainer}</td>
                            <td><a className="btn btn-info btn-sm" href={`/container/edit/${container.id}`} role="button">Edit</a></td>
                            <td><button type="button" onClick={() => setDeleteId(`${container.id}`)} className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#confirmationModal">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            <ConfirmationModal onDelete={handleDelete} />
        </div>
    );
}

export default ContainerTable;