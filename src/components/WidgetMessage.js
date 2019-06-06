import React from 'react';

const WidgetMessage = (props) => {

    return (
        <div className='msg-widget'>
            <h3 className='msg__title'>
                {props.title}
            </h3>
            <span className='msg__msg'>
                {props.msg}
            </span>
            <img className='msg__image' src={props.imgPath}/>
            <button 
                onClick={props.widgetAction}
                className='btn btn--blue'>
                {props.actionButtonTxt}
            </button>
        </div>
    )
}
        
export default WidgetMessage;