import React from 'react';
import './Container.css';
/**
 * Interface for Container
 *
 * @interface Props
 */
interface Props {
    children: JSX.Element;
}

/**
 * Container component
 *
 * @param {Props} props Container Props
 * @returns {JSX.Element} Container
 */
const Container = (props: Props): JSX.Element => {
    return (
        <div className='Container'>
            {props.children}
        </div>
    )
}

export default Container;