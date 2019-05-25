import React from 'react';
import { RichUtils } from 'draft-js';
import { INLINETYPES } from '../helpers/editorStyleMaps';

const ToggleFontStyle = (props) => {

    const currentInlineStyle = props.editorState.getCurrentInlineStyle();

    const fontStyleToggle = (inlineType) => {
        props.onChange(RichUtils.toggleInlineStyle(props.editorState, inlineType));
    };    
    return (
        <div className='note-ui__item'>
            { INLINETYPES.map(type => {
                return (
                    <span 
                        key={type.label}
                        onMouseDown={ e => fontStyleToggle(type.style)}
                        className={
                            `note-ui__inline-types ${currentInlineStyle.has(type.style) ? 'active' : ''}`
                        }
                    >
                        {type.label}
                    </span>
                )
            }) 
            }
        </div>
    )
}

export default ToggleFontStyle;