import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import DocumentTitle from 'react-document-title';

import { Notes } from '../../api/notes.js';

import NoteItem from './NoteItem.jsx';

class NotesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        Meteor.call('notes.insert', this.state.text);
        this.setState({text: ''});
    }

    render() {
        return (
            <DocumentTitle title="notesApp">
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input onChange={this.handleChange} className="form-control" value={this.state.text} placeholder="Enter your note" />
                        </div>
                    </form>
                    {this.props.notes.length ?
                    <ul id="notes-list" className="list-group">
                        {this.props.notes.map((note) => (
                            <NoteItem key={note._id} note={note} />
                        ))}
                    </ul> : <p>Not found your note, please add your note</p>
                    }
                </div>
            </DocumentTitle>
        );
    }
}

NotesList.PropTypes = {
    notes: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('notes');

    const notes = Notes.find({owner: Meteor.userId()}, {sort: {createdAt: -1}}).fetch();

    return {
        notes,
    };
}, NotesList);
