import React, { useState } from 'react';
import { API_URL } from '../../utils/constants';
import Loading from '../common/Loading';
import Button from '../common/Button';
import { processError } from '../../utils/helper';

/**
 * Interface for AddFile
 *
 * @interface Props
 */
interface Props {
    onSuccess: () => void;
}

/**
 * AddFile component
 *
 * @param {Props} props AddFile Props
 * @returns AddFile Component
 */
const AddFile = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * Upload new XML file for convert
     *
     * @param {HTMLFormElement} form Form file data
     */
    const uploadFile = async (form: HTMLFormElement) => {
        setIsLoading(true);
        const formData = new FormData(form);

        try {
            const response = await fetch(`${API_URL}/files`, {
                method: 'POST',
                body: formData,
                mode: "cors",
            });

            if (response.status !== 204) {
                alert(processError(await response.json()));    
                return;
            }

            alert('File uploaded successfully!');
            props.onSuccess();
        } catch (e) {
            alert('Error while adding data!');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
      <>
        <form id='Form-container' className='Form-container' onSubmit={(event) => {
            event.preventDefault();
            uploadFile(document.querySelector("#Form-container") as HTMLFormElement);
        }}>
            <div className='Form-control'>
                <input
                    id='fileInput'
                    type='file'
                    name='XmlFile'
                    className='Text-input Full-width'
                    required
                />
            </div>
            <div className='Form-control' style={{ marginLeft: 16 }}>
                <Button type='submit'>Upload</Button>
            </div>
        </form>
        {
          isLoading &&
          <Loading loadingText='Uploading file...' />
        }
      </>
    );
}

export default AddFile;



