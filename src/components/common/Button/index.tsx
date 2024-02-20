import React from 'react';
import './Button.css';

/**
 * Interface for Button
 *
 * @interface Props
 */
interface Props {
    children: string | JSX.Element;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset' | undefined;
}

/**
 * Button Component
 *
 * @param {Props} props Button Props
 * @returns {JSX.Element} Button
 */
const Button = (props: Props): JSX.Element => {
    const { type = 'button' } = props;
    return (
        <button type={type} className='Base' onClick={props.onClick}>{props.children}</button>
    );
}

export default Button;