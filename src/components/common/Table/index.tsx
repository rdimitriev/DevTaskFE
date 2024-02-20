import React from 'react';
import './Table.css';
import Button from '../Button';

/**
 * Interface for Table
 *
 * @interface Props
 */
interface Props {
    columns: any[];
    rows: any[];
    onDownload: (fileName: string) => void;
    onDelete: (fileName: string) => void;
}

/**
 * Table component
 *
 * @param {Props} props Table Props
 * @returns Table
 */
const Table = (props: Props) => {

    return (
        <div className='Table-container'>
            <table className='Table-wrapper'>
                <thead>
                    <tr className='Table-header-row'>
                        {
                            props.columns.map((column) => (
                                <th className='Table-cell Table-cell-head' key={column.id}>{column.label}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rows.map((row, rowIndex) => {
                            return (
                                <tr className='Table-row' key={rowIndex}>
                                    {
                                        props.columns.map((column, columnIndex) => {
                                            const value = row[column.id];
                                            if (column.id === 'action') {
                                                return (
                                                    <td className='Table-cell Table-cell-body Table-cell-last' key={columnIndex}>
                                                        <span className='Table-action-cell'>
                                                            <Button onClick={() => { props.onDownload(row.name) }}>Download</Button>
                                                            <Button onClick={() => { props.onDelete(row.name) }}>Delete</Button>
                                                        </span>
                                                    </td>
                                                )
                                            } else {
                                                return (
                                                    <td className='Table-cell Table-cell-body' key={columnIndex}>
                                                        {column.format ? column.format(value) : value}
                                                    </td>
                                                )
                                            }
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;