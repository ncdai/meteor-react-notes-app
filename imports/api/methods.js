// import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';
//
// import { Notes } from './notes.js';
//
// Meteor.methods({
//     'notes.insert'(text) {
//         check(text, String);
//
//         if (!this.userId) {
//             throw new Meteor.Error('not-authorized');
//         }
//
//         Notes.insert({
//             text,
//             owner: this.userId,
//             createdAt: new Date()
//         });
//     }
// });
