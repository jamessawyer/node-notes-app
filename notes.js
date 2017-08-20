console.log('notes module');

const fs = require('fs');
const R = require('ramda');

// 取回数据
const fetchNotes = () => {
    try {
        let noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    } catch (e) {
        console.log('e', e);
        return [];
    }
}

// 保存数据
const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

// 添加note
const addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {
        title,
        body
    };

    // let duplicate = notes.filter(note => note.title === title); 上面方法等价于 
    // let duplicate = R.length(R.filter(R.whereEq({title: ''}), notes))  是否是重复的title
    let isDuplicateTitle = R.contains(title)(R.map(R.prop('title'))(notes))

    if (!isDuplicateTitle) {
        console.log('no duplicate title');
        notes.push(note);
        saveNotes(notes);
        return note;
    }

}

// 获取所有notes
const getAll = () => fetchNotes();

// 获取note
const getNote = (title) => {
    let notes = fetchNotes();    
    return R.filter(R.whereEq({title}, R.__))(notes)[0]
};

// 移除note
const removeNote = (title) => {
    let notes = fetchNotes();
    console.log(`notes ${JSON.stringify(notes, null, 2)}`)
    // 移除指定title的note
    let filteredNotes = R.reject(R.whereEq({title: title}, R.__))(notes);
    /* 
        console.log('f', filteredNotes);
        if (R.equals(notes, filteredNotes)) {
            console.log('该note不存在');
            return false;
        } 
    */
    saveNotes(filteredNotes);

    return !R.equals(notes, filteredNotes); // false 表示 移除成功
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
}