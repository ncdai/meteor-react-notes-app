import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

import { Notes } from '../../../api/notes.js';

export default class NoteText extends Component {
    constructor(props) {
        super(props);

        this.state = {text: this.props.note.text};

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }
    handleSave() {
        if (this.state.text) {
            Meteor.call('notes.update.text', this.props.note._id, this.state.text);
        }
        this.setState({onEdit: false});
    }
    handleSubmit(e) {
        e.preventDefault();
        return this.handleSave();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} onBlur={this.handleSave} className="input-note-text" value={this.state.text} />
            </form>
        );
    }
}
