import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../../api/notes.js'

import NoteText from '../components/NotePage/NoteText.jsx';
import NoteContent from '../components/NotePage/NoteContent.jsx';
import NotFound from '../pages/NotFoundPage.jsx';

class NotePage extends Component {
    render() {
        const { loading, note, count } = this.props;

        if (loading) return (<span>Loading ...</span>);

        if (!count) return (<NotFound />);

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
    const count = Notes.find(params.id).count();
    return {
        loading,
        note,
        count
    };
}, NotePage);
