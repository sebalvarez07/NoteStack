export default (notes, filters) => {
    const notesTemp = notes.filter( note => {

        // Match by text
        const filterText = filters.text.toLowerCase();
        const noteTitleText = note.title.toLowerCase();
        const noteContentText = note.textContent.toLowerCase();
        const textMatch = noteTitleText.includes(filterText) || noteContentText.includes(filterText);

        // Match by subject
        const subjectMatch = note.subject.toLowerCase() === filters.subject.toLowerCase() || filters.subject === 'all_subjects';

        return textMatch && subjectMatch;
    });

    if(filters.sortBy === 'latest'){
        notesTemp.sort( (noteA, noteB) => noteA.dateCreated < noteB.dateCreated ? 1 : -1);
    }

    if(filters.sortBy === 'earliest'){
        notesTemp.sort( (noteA, noteB) => noteA.dateCreated < noteB.dateCreated ? -1 : 1);
    }

    return notesTemp;
};