import React, { useState } from 'react';
import FavouriteListItem from './FavouriteListItem';

const FavouriteList = (props) => {

    const numLoadNotes = 4;
    const [loadNotes, setLoadNotes] = useState(numLoadNotes);

    const showMore = (e) => {
        if(props.notes.length > loadNotes) {
            setLoadNotes(loadNotes + 4)
        }
    }

    const showLess = (e) => {
        if(loadNotes > numLoadNotes) {
            setLoadNotes(loadNotes - 4);
        }
    }

    return (
        <React.Fragment>
            <div className='fave-note__list'>
                {
                    props.notes.reduce((acc, note) => {
                        if(acc.length < loadNotes) {
                            acc.push(<FavouriteListItem key={note.id} note={note}/>);
                        }
                        return acc;
                    }, [])
                }
            </div>
            <div className='dashboard-loaders'>

                { props.notes.length > loadNotes && 
                    <span 
                        className={'dashoard__load-more'}
                        onMouseDown={showMore}
                        >
                        Show more
                    </span>
                }
                
                { loadNotes > numLoadNotes && 
                    <span 
                        className={'dashoard__load-more'}
                        onMouseDown={showLess}
                        >
                        Show Less
                    </span>
                }
            </div>
        </React.Fragment>
    )
}

export default FavouriteList;
