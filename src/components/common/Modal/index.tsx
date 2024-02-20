import React from 'react';
import './Modal.css';

/**
 * Interface for Modal
 *
 * @interface Props
 */
interface Props {
    children: JSX.Element;
    title: string;
    closeCallback: () => void;
}

/**
 * Modal component
 *
 * @param {Props} props Modal Props
 * @returns Modal
 */
const Modal = (props: Props) => {
    return (
        <div className='Backdrop-overlay Fade-out'>
            <div className='Modal-container Fade-in'>
            <div className='Modal-header'>
                <span className='Modal-title'>{props.title}</span>
                <span className='Modal-close-button Modal-title' onClick={props.closeCallback}>x</span>
            </div>
            <div className='Modal-content'>
                {props.children}
            </div>
            </div>
        </div>
    );
}

export default Modal;