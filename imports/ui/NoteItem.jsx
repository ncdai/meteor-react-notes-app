import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router';
import Input from 'react-input-autosize';

import { Notes } from '../api/notes.js';

export default class Note extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onEdit: false,
            text: '',
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleEdit() {
        this.setState({
            onEdit: true,
            text: this.props.note.name
        });
    }
    handleChange(e) {
        this.setState({text: e.target.value});
    }
    handleSave() {
        Notes.update(this.props.note._id, {
            $set: {name: this.state.text}
        });
        this.setState({onEdit: false});
        if (!this.state.text) {
            Notes.remove(this.props.note._id);
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        return this.handleSave();
    }
    handleBlur() {
        return this.handleSave();
    }
    handleDelete() {
        Notes.remove(this.props.note._id);
    }

    render() {
        if (! this.state.onEdit) {
            return (
                <li key={this.props.note._id}>
                    <label onClick={this.handleEdit}>{this.props.note.name}</label>
                    <a href="#" onClick={this.handleDelete}><i className="glyphicon glyphicon-remove text-red"></i></a>
                    <Link to={"/note/" + this.props.note._id}><i className="glyphicon glyphicon-eye-open text-blue"></i></Link>
                </li>
            );
        } else {
            return (
                <li>
                    <form onSubmit={this.handleSubmit}>
                        <Input onChange={this.handleChange} onBlur={this.handleBlur} value={this.state.text} autoFocus />
                    </form>
                </li>
            );
        }
    }
}
