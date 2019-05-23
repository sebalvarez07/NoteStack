import React from 'react';
import { FONTTYPES } from '../helpers/editorStyleMaps';

const ToggleFontTypes = (props) => {
    
    const isFontType = !!FONTTYPES.map(ft => ft.style).find(ft => ft === props.currentTypeBlock);

    return (    
        <div className='note-ui__item font-types note-item__subject'>
            <select 
                value={ isFontType ? props.currentTypeBlock : 'no_value'} 
                onChange={e => props.toggleBlockUI(e.target.value)}
                className='select select--font-type'
                >
                { 
                    FONTTYPES.map(fontType => 
                        <option key={fontType.label} value={fontType.style}>{fontType.label}</option>
                    )
                }
                {
                    !isFontType && <option value={'no_value'}>{'--'}</option>
                }
            </select>
            <i className="ionicons ion-chevron-down"></i>
        </div>
    )
}

export default ToggleFontTypes;