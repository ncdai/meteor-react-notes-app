import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router';

import { Notes } from '../../api/notes.js';

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
            text: this.props.note.text
        });
    }
    handleChange(e) {
        this.setState({text: e.target.value});
    }
    handleSave() {
        Meteor.call('notes.update.text', this.props.note._id, this.state.text);
        this.setState({onEdit: false});
        if (!this.state.text) {
            Meteor.call('notes.remove', this.props.note._id);
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
        Meteor.call('notes.remove', this.props.note._id);
    }

    render() {
        if (! this.state.onEdit) {
            return (
                <li className="list-group-item" key={this.props.note._id}>
                    <span onClick={this.handleEdit}>{this.props.note.text}</span>
                    <div className="pull-right action">
                        <Link to={"/note/" + this.props.note._id}><i className="glyphicon glyphicon-eye-open text-blue"></i></Link>
                        <a href="#" onClick={this.handleDelete}><i className="glyphicon glyphicon-remove text-red"></i></a>
                    </div>
                </li>
            );
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} onBlur={this.handleBlur} className="form-control input-edit" value={this.state.text} autoFocus />
                </form>
            );
        }
    }
}
