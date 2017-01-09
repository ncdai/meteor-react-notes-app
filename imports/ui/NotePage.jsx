import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Textarea from 'react-textarea-autosize';
import Input from 'react-input-autosize';

import { Notes } from '../api/notes.js'

class NoteName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            onEdit: false
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEdit() {
        this.setState({
            text: this.props.note.name,
            onEdit: true
        });
    }
    handleChange(e) {
        this.setState({text: e.target.value});
    }
    handleSave() {
        if (this.state.text) {
            Notes.update(this.props.note._id, { $set: {name: this.state.text} });
        }
        this.setState({onEdit: false});
    }
    handleSubmit(e) {
        e.preventDefault();
        return this.handleSave();
    }

    render() {
        if (this.state.onEdit) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <Input className="input-h4" onChange={this.handleChange} onBlur={this.handleSave} value={this.state.text} autoFocus />
                </form>
            );
        } else {
            return (
                <h4 onClick={this.handleEdit}>{this.props.note.name}</h4>
            );
        }
    }
}

class NoteContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.note.content
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }
    handleSubmit() {
        Notes.update(this.props.note._id, { $set: { content: this.state.text ? this.state.text : '' } });
    }

    render() {
        return (
            <Textarea onChange={this.handleChange} onBlur={this.handleSubmit} value={this.state.text} placeholder="Enter your note content"></Textarea>
        );
    }
}

class NotePage extends Component {
    render() {
        const { loading, note } = this.props;

        if (loading) return (<span>Loading ...</span>);

        return (
            <div>
                <NoteName note={note} />
                <NoteContent note={note}/>
            </div>
        );
    }
}

NotePage.PropTypes = {
    loading: PropTypes.bool.isRequired,
    note: PropTypes.object.isRequired
};

export default createContainer(({params}) => {
    const subscription = Meteor.subscribe('note', params.id);
    return {
        loading: !subscription.ready(),
        note: Notes.findOne(params.id)
    };
}, NotePage);
