import React from 'react';

const BlockIconUI = (props) => {

    return (
        <span 
            onMouseDown={ e => props.toggleBlockUI(e, props.blockStyle)}
            className={props.nameClass}
        >
            <img className='block-UI__icon-svg' src={`/images/UI-icons/${props.iconImg}.svg`}/>
        </span>
    )
};

export default BlockIconUI;