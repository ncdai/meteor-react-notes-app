import { Meteor } from 'meteor/meteor';

import { Notes } from '../notes.js';

Meteor.publish('notes', function notesPublication() {
    return Notes.find();
});

Meteor.publish('note', function notePublication(id) {
    return Notes.find({_id: id});
});
