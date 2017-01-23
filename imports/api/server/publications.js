import { Meteor } from 'meteor/meteor';

import { Notes } from '../notes.js';

Meteor.publish('notes', function() {
    return Notes.find();
});

Meteor.publish('note', function(id) {
    return Notes.find({_id: id});
});

Meteor.publish('user', function() {
    return Meteor.users.find();
});
