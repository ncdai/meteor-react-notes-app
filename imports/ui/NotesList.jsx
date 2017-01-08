import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes.js';

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

    renderNote() {
        return (
            this.props.notes.map((note) => (
                <NoteItem key={note._id} note={note} />
            ))
        );
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        Notes.insert({
            name: this.state.text,
            createdAt: new Date()
        });
        this.setState({text: ''});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.text} placeholder="Enter your note" />
                </form>
                <ul>
                    {this.renderNote()}
                </ul>
            </div>
        );
    }
}

NotesList.PropTypes = {
    notes: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('notes');

    return {
        notes: Notes.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, NotesList);
