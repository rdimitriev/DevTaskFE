import { getFormattedDate, numberFormat } from "./helper";
import { Column } from "./interfaces";

// Server API
export const API_URL = 'http://localhost:3001/api';

// Table columns configuration
export const columns: Column[] = [
    {
        id: 'name',
        label: 'File Name'
    },
    {
        id: 'size',
        label: 'File Size',
        format: (value: number) => numberFormat(value)
    },
    {
        id: 'createdOn',
        label: 'Date Created',
        format: (value: Date) => getFormattedDate(value)
    },
    {
        id: 'action',
        label: ''
    }
];
