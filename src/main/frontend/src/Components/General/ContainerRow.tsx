import React from "react";

import { Container } from '../../Types/Container';
import { ContainerItem } from "../../Types/ContainerItem";

type ContainerRowProps = {
    containers: Container[];
    index: number;
    containerItems?: ContainerItem[];
};

const ContainerRow = ( { containers, index, containerItems }: ContainerRowProps) => {

    return (
        <>
            <table className="table table-info table-hover table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Container ID</th>
                        <th scope="col">Quantity</th>
                    </tr>
                </thead>
                
                <tbody>
                    {containers.map((container, containerIndex) => (
                        <tr key={`container-${index}-${containerIndex}`}>
                            <th scope="row">{container.name}</th>
                            <td>{container.description}</td>
                            <td>{container.scannerId}</td>
                            <td>{containerItems?.[containerIndex]?.quantity}</td> {/* This doesn't work! The values do not correspond to the correct container. FIX! */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
};

export default ContainerRow;