import React from "react";

import { Container } from '../../Types/Container';

type ContainerRowProps = {
    containers: Container[];
    index: number;
};

const ContainerRow = ( { containers, index }: ContainerRowProps) => {

    return (
        <>
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
                    {containers.map((container, containerIndex) => (
                        <tr key={`container-${index}-${containerIndex}`}>
                            <th scope="row">{container.id}</th>
                            <td>{container.name}</td>
                            <td>{container.description}</td>
                            <td>{container.scannerId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
};

export default ContainerRow;