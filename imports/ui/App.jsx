import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <h1><Link to="/">notesApp</Link></h1>
                {this.props.children}
            </div>
        );
    }
}
