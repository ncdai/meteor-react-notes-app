import { Notes } from '../../api/notes.js';

if (Notes.find().count() == 0) {
    Notes.insert({
        name: 'This is note 1',
        content: 'Learning React'
    });

    Notes.insert({
        name: 'This is note 2',
        content: 'Learning Nodejs'
    });

    Notes.insert({
        name: 'This is note 3',
        content: 'Learning Meteor'
    });
}
