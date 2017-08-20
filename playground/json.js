const fs = require('fs');

let originalNote = {
    title: 'jianshu',
    body: 'nodejs study notes'
}

let orginalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json', orginalNoteString);

let noteString = fs.readFileSync('notes.json');

let note = JSON.parse(noteString);

console.log(typeof note)
console.log(note.title)
