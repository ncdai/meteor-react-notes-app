import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html';
import { stateToHTML } from 'draft-js-export-html';

import '../../../api/notes.js';

export default class NoteContent extends Component {
    constructor(props) {
        super(props);

        let editorState = this.props.note.content !== undefined ? EditorState.createWithContent(stateFromHTML(this.props.note.content)) : EditorState.createEmpty();
        this.state = {
            editorState: editorState,
        };

        this.onChange = (editorState) => this.setState({editorState});
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    handleBlur() {
        let noteId = this.props.note._id;
        let content = stateToHTML(this.state.editorState.getCurrentContent());
        Meteor.call('notes.update.content', noteId, content);
    }

    render() {
        return (
            <div className="note-content" >
                <Editor
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                    onBlur={this.handleBlur}
                    placeholder="Enter your note content"
                />
            </div>
        );
    }
}
