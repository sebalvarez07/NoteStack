import React from 'react';
import moment from 'moment';
import { Link }  from 'react-router-dom';

const NoteListItem = ({note}) => {

    const date = moment(note.dateCreated).format('MMM-DD-YYYY').split('-');

    return (
        <Link
            to={`/edit/${note.id}`}
            className='preview-single'>
            <div className='preview__date-subject'>
                { note.subject !== '' && 
                    <span className='preview__subject'>{note.subject}</span>
                }
                <span className='preview__date'>{date[0]} {date[1]}, {date[2]}</span>
            </div>
            <h3 className='preview__title'>{note.title === ''? 'Undefined' : note.title}</h3>
        </Link>
    );
};

export default NoteListItem;