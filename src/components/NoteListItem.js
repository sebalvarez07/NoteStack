import React from 'react';
import moment from 'moment';
import { Link }  from 'react-router-dom';
import FavouriteNoteButton from './FavouriteNoteButton';
import RemoveNoteButton from './RemoveNoteButton';

const NoteListItem = ({note}) => {

    const date = moment(note.dateCreated).format('MMM-DD-YYYY').split('-');

    const limitTitleChar = () => {

        const charLimit = 25;
        const strArr = note.title.split(' ');
        const reduced = strArr.reduce((acc, current) => {
            if(acc.length + current.length < charLimit) {
                acc += current + ' ';
            }

            return acc;
        }, '');

        return note.title.length > charLimit ? reduced.trim() + '...' : note.title;
    }

    return (
        <div className='preview-single'>
            <div className='preview-single__container'>
                <Link
                    to={`/edit/${note.id}`}
                    className='preview-single__link'>
                    <div className='preview__date-subject'>
                        { note.subject !== '' && 
                            <span className='preview__subject'>{note.subject}</span>
                        }
                        <span className='preview__date'>{date[0]} {date[1]}, {date[2]}</span>
                    </div> 
                    <h3 className='preview__title'>{note.title === ''? 'Undefined' : limitTitleChar()}</h3>
                </Link>
                <div className='preview-single__controls'>
                    <span className='preview-single__control preview-single__favourite'>
                        <FavouriteNoteButton noteID={note.id} />
                    </span>
                    <span className='preview-single__control preview-single__remove'>
                        <RemoveNoteButton noteID={note.id} />
                    </span>
                </div>
            </div>
        </div>
        
    );
};

export default NoteListItem;