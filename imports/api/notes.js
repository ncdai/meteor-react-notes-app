import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
    'notes.insert'(text) {
        check(text, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Notes.insert({
            text,
            owner: this.userId,
            createdAt: new Date()
        });
    },

    'notes.update.text'(noteId, text) {
        check(noteId, String);
        check(text, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Notes.update(noteId, {$set: {text}});
    },
    'notes.update.content'(noteId, content) {
        check(noteId, String);
        check(content, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Notes.update(noteId, {$set: {content}});
    },

    'notes.remove'(noteId) {
        check(noteId, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Notes.remove(noteId);
    }
});
