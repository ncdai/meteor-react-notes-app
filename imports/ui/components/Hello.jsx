import React, { Component } from 'react';

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: 'Hello 1',
        }
    }

    render() {
        return (
            <input type="text" onChange={this.props.handleChange.bind(this)} value={this.state.text} />
        );
    }
}

export default class Hello extends Component {
    handleChange(e) {
        this.setState({text: e.target.value});
    }

    render() {
        return (
            <div>
                <Content handleChange={this.handleChange} />
            </div>
        );
    }
}
