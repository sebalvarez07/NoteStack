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
                    onMouseDown={() => setDropdownState(!dropDownState)}
                    >
                    {
                        props.className === 'color__icon--text' ? 
                            ( 
                                <span className='text-color__active-icon' style={active__style ? {background: active__style.color} : {}}></span> 
                            ) : (  
                                <React.Fragment>
                                    <span 
                                        className='flex-middle ui-icon__container'
                                    >
                                        <img className='block-UI__icon-svg' src={`/images/UI-icons/highlighter.svg`}/>
                                    </span>
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
                                    <div 
                                        key={color}
                                        onMouseDown={ e => props.handleToggleColor(e, color, props.StyleMap) }

                                        style={ 
                                            props.className === 'color__icon--text' ?  
                                                props.currentInlineStyle.has(color) ? { backgroundColor: color } : {}
                                            : 
                                                props.currentInlineStyle.has(color) ? { backgroundColor: props.StyleMap[color].backgroundColor } : {}
                                        }

                                        className={`icon-color__container ${props.currentInlineStyle.has(color) ? 'active' : ''}`}
                                    >
                                        <span     
                                            style={ 
                                                props.className === 'color__icon--text' ?  
                                                    { backgroundColor: color } 
                                                : 
                                                    { backgroundColor: props.StyleMap[color].backgroundColor }
                                            }
                                            className={'icon-color'}
                                            >
                                            { props.currentInlineStyle.has(color) && <i className="ionicons ion-checkmark"></i> }
                                        </span>                
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>

    )

};

export default ToggleColorButton;