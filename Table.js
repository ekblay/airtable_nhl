// Table.js

import React from "react";
import { useTable } from "react-table";

export default function Table({ columns, data }) {
// Table component logic and UI come here
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable({
        columns,
        data
    });

    return (
        <table className={"table table-bordered"} {...getTableProps()}>
            <thead >
            {headerGroups.map(headerGroup => (
                <tr  {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()} key={column.id}>{column.render("Header")}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} key={row.id}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()} key={cell.id}>{cell.render("Cell")}</td>;
                        })}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}