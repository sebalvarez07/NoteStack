import React from 'react';
import moment from 'moment';
import { Link }  from 'react-router-dom';

const NoteListItem = ({note}) => {

    const date = moment(note.dateCreated).format('MMM-DD').split('-');

    return (
        <Link 
            to={`view/${note.id}`}
            className='note-single'>
            <div className='note__date'>
                <span className='note__month'>{date[1]} </span> 
                <span className='note__day'>{date[0]}</span>
            </div>
            <div className='note__preview'>
                <h3 className='preview__title'>{note.title}</h3>
                <p className='preview__text'>{note.textContent.length > 30 ? note.textContent.slice(0, 30)  + '...' : note.textContent}</p>
            </div>
            {/*<span className='preview__subject'>React</span>*/}
        </Link>
    )
};

export default NoteListItem;