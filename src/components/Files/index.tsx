import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Table from '../common/Table';
import Loading from '../common/Loading';
import AddFile from './AddFile';
import { processError } from '../../utils/helper';
import { API_URL, columns } from '../../utils/constants';
import { JsonFile } from '../../utils/interfaces';
import './Files.css';

/**
 * File component
 *
 * @returns Files grid list
 */
const Files = () => {
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [files, setFiles] = useState<JsonFile[]>([]);
    const [initialFiles, setInitialFiles] = useState<JsonFile[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => { getFiles() }, []);
 
    /**
     * Get all the json files from the back-end
     * 
     */
    const getFiles = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/files/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.status !== 200) {
                alert(processError(data));    
                return;
            }

            setFiles(data);
            setInitialFiles(data);
        } catch (e) {
            alert('Error while fetching data!');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    /**
     * Download the requested json file
     *
     * @param {string} fileName File name
     */
    const handleDownload = async (fileName: string) => {
        setIsLoading(true);
        
        try {
            const response = await fetch(`${API_URL}/files/${fileName}`, {
                method: 'GET',
            });

            if (response.status !== 200) {
                alert(processError(await response.json()));    
                return;
            }

            const data = await response.blob();

            download(data, fileName, 'text/json')
        } catch (e) {
            alert('Error while fetching data!');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    /**
     * Delete the requested json file
     *
     * @param {string} fileName File name
     */
    const handleDelete = async (fileName: string) => {
        if (window.confirm('Are you sure you want to delete this file?')) {
            setIsLoading(true);

            try {
                const response = await fetch(`${API_URL}/files/${fileName}`, {
                    method: 'DELETE',
                });
    
                if (response.status !== 204) {
                    alert(processError(await response.json()));    
                    return;
                }

                alert('File successfully deleted!');
            } catch (e) {
                alert('Error while deleting file!');
                console.error(e);
            } finally {
                await getFiles();
                setIsLoading(false);
            }
        }
    }

    /**
     * Modal close callback
     *
     * @param {string} modalType Type of modal
     */
    const onModalClose = async (modalType: string) => {
        await getFiles();
        
        if (modalType === 'Add') {
            setShowAddModal(false);
        }
    }

    /**
     * To search the file props
     *
     * @param {{ target: { value: React.SetStateAction<string>; }; }} event Change input event
     * @returns Filtered files list
     */
    const handleSearch = async (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(event.target.value);
        
        if (event.target.value.length > 0 && event.target.value.length < 3) {
            return;
        }

        if (event.target.value.length === 0) {
            setFiles(initialFiles);
            
            return;
        }
        
        const checkNameFilter = (file: JsonFile) => (
            file.name
                .toLowerCase()
                .indexOf(searchTerm) !== -1
        );

        const checkSizeFilter = (file: JsonFile) => (
            file.size
                .toString()
                .indexOf(searchTerm) !== -1
        );

        const checkCreatedFilter = (file: JsonFile) => (
            file.createdOn
                .indexOf(searchTerm) !== -1
        );

        const filteredData = files.filter((file: JsonFile) =>
            checkNameFilter(file) ||
            checkSizeFilter(file) ||
            checkCreatedFilter(file)
        );

        setFiles(filteredData);
    }

    return (
        <>
            <div className='Wrapper'>
                <div className='Header-container'>
                    <Button onClick={() => setShowAddModal(true)}>Upload XML file</Button>
                    <div>
                        <input placeholder='Search...' className='Text-input' value={searchTerm} onChange={handleSearch} />
                    </div>
                </div>
            </div>
            {
                showAddModal &&
                <Modal title='Choose file for uploading' closeCallback={() => setShowAddModal(false)}>
                    <AddFile onSuccess={() => onModalClose('Add')} />
                </Modal>
            }
            {files && files.length > 0 &&
                <Table
                    columns={columns}
                    rows={files}
                    onDownload={handleDownload}
                    onDelete={handleDelete}
                />
            }
            {
                isLoading &&
                <Loading loadingText={'Loading list of files ...'} />
            }
        </>
  );
}

export default Files;