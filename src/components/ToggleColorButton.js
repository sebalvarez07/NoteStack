import React, { useState } from 'react';

const ToggleColorButton = (props) => {
 
    let active__style = Object.keys(props.StyleMap).find(style => {
        return props.currentInlineStyle.has(style);
    });

    active__style = active__style ? props.StyleMap[active__style] : undefined;

    const [dropDownState, setDropdownState] = useState(false);

    return (
        <div className='noteUI-dropdown note-ui__item' tabIndex={0} onBlur={() => setDropdownState(false)}>
                <div 
                    className={`${props.className}`}
                    onMouseDown={() => setDropdownState(!props.dropDownState)}
                    >
                    {
                        props.className === 'color__icon--text' ? 
                            ( 
                                <span className='text-color__active-icon' style={active__style ? {background: active__style.color} : {}}></span> 
                            ) : (  
                                <React.Fragment>
                                    <img className='highlight-icon' src='/images/highlighter_icon.svg' />
                                    <span className='highlight__active' style={active__style ? {background: active__style.backgroundColor} : {}}></span> 
                                </React.Fragment>
                            )
                    }
                </div>
                { dropDownState && 
                    <div className='dropdown__options'>
                        {
                            Object.keys(props.StyleMap).map(color => {
                                return (
                                    <span
                                        key={color}
                                        onMouseDown={ e => props.handleToggleColor(e, color, props.StyleMap) }
                                        style={ 
                                            props.className === 'color__icon--text' ?  
                                                { backgroundColor: color } 
                                            : 
                                                { backgroundColor: props.StyleMap[color].backgroundColor }
                                        }
                                        className={`icon-color ${props.currentInlineStyle.has(color) ? 'active' : ''}`}
                                        >
                                    </span>                
                                )
                            })
                        }
                    </div>
                }
            </div>

    )

};

export default ToggleColorButton;