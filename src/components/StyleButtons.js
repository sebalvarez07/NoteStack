import React from 'react';

const StyleButtons = (props) => {

    const handleClick = (e) => {
        e.preventDefault();
        props.onToggle(props.style);
    };

    return (
        (<button 
            className={`btn--rich-text ${props.active ? 'active' : ''}`}
            onClick={handleClick}

            >
            {props.label}
        </button>)
    );
}

export default StyleButtons