console.log('app starts');

const fs = require('fs');
const R = require('ramda');
const yargs = require('yargs');

const notes = require('./notes');
const {logNote} = require('./utils/log');

const titleOption = {
    description: 'title of note',
    demand: true, // 这个参数是否必须的
    alias: 't' // 别名 原本参数写法为 '--title', 现在只写为 '-t' 即可
}
const bodyOption = {
    description: 'body of note',
    demand: true, // 这个参数是否必须的
    alias: 'b'
}

const argv = yargs
    .command('add', 'add note', { // command 用于定义命令行的一些参数和用法
        title: titleOption,
        body: bodyOption
    })
    .command('list', 'list all notes')
    .command('read', 'read the note', {title: titleOption})
    .command('remove', 'remove the note', {title: titleOption})
    .help()
    .argv;

// console.log('Process', process.argv)
console.log('Yargs argv ', argv)
var command = argv._[0];
// var command = process.argv[2];

if (command === 'add') {
    let note = notes.addNote(argv.title, argv.body);

    if (note) {
        console.log(`note created`)
        logNote(note);
    } else {
        console.log('duplicate title, disallow to write');
    }
    // console.log(`the 2nd argv is list`)
} else if (command === 'list') {
    let allNotes = notes.getAll();
    R.forEach(logNote, allNotes);
} else if (command === 'read') {
    let note = notes.getNote(argv.title);
    if (!note) {
        console.log('没有找到该note');
    } else {
        console.log('note find');
        logNote(note);
    }
} else if (command === 'remove') {
    let isNoteRemoved = notes.removeNote(argv.title);
    let message = isNoteRemoved
        ? 'note 移除成功'
        : 'note 移除失败';
    console.log('note remove ', message);
} else {
    console.log(`unknow arg`)
}
