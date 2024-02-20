import { JsonError } from "./interfaces";

/**
 * Format the created on date
 *
 * @param {Date} date Full Date
 * @returns {string} Formatted Date
 */
export const getFormattedDate = (date: Date): string => {
    const d = new Date(date);
    
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
}
 
/**
 * Format the file size
 *
 * @param {number} n Number
 * @returns {string} Number with human readable separators
 */
export const numberFormat = (n: number): string => {
    if (typeof n !== 'number') return ''

    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Format error messages
 * 
 * @param {JsonError} jsonError Error respone from the server
 * @returns {string} Formatted human readable error
 */
export const processError = (jsonError: JsonError): string => {
    let errorMessage = '';
    for (const prop in jsonError.errors) {
        errorMessage += jsonError.errors[prop].map((err: String) => (`${prop}: ${err}\n`));
    }
    
    return `Error Message: ${jsonError.message}\n\nDetails:\n${errorMessage}`;
}
