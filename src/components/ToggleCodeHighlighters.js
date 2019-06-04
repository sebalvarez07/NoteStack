import React, { useState } from 'react';
import { CODE_HIGHLIGHTERS } from '../helpers/editorStyleMaps';

const ToggleCodeHighlights = (props) => {

    const [dropDownState, setDropdownState] = useState(false);

    return (
        <div className='noteUI-dropdown note-ui__item' tabIndex={0} onBlur={() => setDropdownState(false)}>
            
            <span 
                onMouseDown={ e => setDropdownState(!dropDownState) }
                className='flex-middle'
            >
                <img className='block-UI__icon-svg' src={`/images/UI-icons/code.svg`}/>
            </span>
            { dropDownState && 
                <div className='dropdown__options'>
                    {
                        CODE_HIGHLIGHTERS.map(highlighter => {
                            return (
                                <span
                                    key={highlighter.label}
                                    onMouseDown={ e => props.toggleBlockUI(e, highlighter.style) }
                                    className='code-options'
                                    >
                                    {highlighter.label}
                                </span>                
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default ToggleCodeHighlights;