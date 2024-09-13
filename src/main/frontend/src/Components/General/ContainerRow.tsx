import React from "react";

import { ContainerItem } from "../../Types/ContainerItem";

type ContainerRowProps = {
    containerItems: ContainerItem[];
    index: number;
};

const ContainerRow = ( { containerItems, index }: ContainerRowProps) => {

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
                    {containerItems.map((containerItem, containerIndex) => (
                        <tr key={`container-${index}-${containerIndex}`}>
                            <th scope="row">{containerItem.container?.name}</th>
                            <td>{containerItem.container?.description}</td>
                            <td>{containerItem.container?.scannerId}</td>
                            <td>{containerItem.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
};

export default ContainerRow;