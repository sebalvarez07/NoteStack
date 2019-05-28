import React from 'react';
import FavouriteNoteButton from './FavouriteNoteButton';
import { Link } from 'react-router-dom';
import moment from 'moment';

const FavouriteListItem = ({note}) => {

    const date = moment(note.dateCreated).format('MMM-DD-YYYY').split('-');

    return (
        <div className='fave-note__card'>
            <Link to={`/edit/${note.id}`} className='fave-note__main-content'>
                <span className='fave-note__date'>
                    <span className='fave-note__day'>{date[1]}</span>
                    <span className='fave-note__month'>{date[0]}</span>
                </span>
                <div className='fave-note__content'>
                    <span className='fave-note__title'>{note.title !== '' ? note.title : 'Title Undefined'}</span>
                    <span className='fave-note__text-content'>
                        { note.textContent !== ''? note.textContent : 'No content to display'}
                    </span>
                </div>

                <div className='fave-note__right'>
                    {
                        note.subject !== '' &&
                        <span className='fave-note__subject'>{ note.subject }</span>
                    }
                </div>
            </Link>
            <span className='fave-note__fave'>
                <FavouriteNoteButton noteID={note.id} />
            </span>
        </div>
    )
}

export default FavouriteListItem;