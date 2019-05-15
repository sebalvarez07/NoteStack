export default (notes) => {
    const allSubjects =  notes.map(note => note.subject);
    return allSubjects.reduce((arr, cur) => {
        if(cur !== '' && arr.findIndex(subject => subject === cur) === -1){
            arr.push(cur);
        }
        return arr;
    }, []);
};