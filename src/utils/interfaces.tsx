/**
 * Interface for json file
 *
 * @exports
 * @interface JsonFile
 */
export interface JsonFile {
    name: string;
    size: number;
    createdOn: string;
};

/**
 * Interface for json error response
 *
 * @exports
 * @interface JsonError
 */
export interface JsonError {
    statusCode: number;
    message: string;
    errors: {
        [key: string]: string[];
    } 
};

/**
 * Interface for Table Columns
 *
 * @exports
 * @interface Column
 */
export interface Column {
    id: 'name' | 'size' | 'createdOn' | 'action';
    label: string;
    format?: (value: any) => string;
}
