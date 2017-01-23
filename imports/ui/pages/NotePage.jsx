import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../../api/notes.js'

import NoteText from '../components/NotePage/NoteText.jsx';
import NoteContent from '../components/NotePage/NoteContent.jsx';

class NotePage extends Component {
    render() {
        const { loading, note } = this.props;

        if (loading) return (<span>Loading ...</span>);

        return (
            <div className="panel panel-default no-border">
                <div className="panel-body">
                    <NoteText note={note} />
                    <NoteContent note={note} />
                </div>
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
    const loading = !subscription.ready();
    const note = Notes.findOne(params.id);
    return {
        loading,
        note
    };
}, NotePage);
