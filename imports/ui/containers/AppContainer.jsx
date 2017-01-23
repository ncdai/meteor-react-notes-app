import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            username: ''
        };
        this.logout = this.logout.bind(this);
    }

    componentWillMount(){
        if (!this.state.isAuthenticated) {
            browserHistory.push('/login');
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.isAuthenticated) {
            browserHistory.push('/login');
        }
    }

    logout(e) {
        e.preventDefault();
        Meteor.logout();
        browserHistory.push('/login');
    }

    render() {
        const { loading, currentUser } = this.props;

        if (loading) return (<span>Loading...</span>);

        return (
            <div>
                <nav className="navbar navbar-default" id="menu-head">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to="/" className="navbar-brand" id="logo">notesApp</Link>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Chào {currentUser.username}<span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#" onClick={this.logout}>Logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default createContainer(() => {
    const isAuthenticated = Meteor.userId() !== null;
    const loading = !Meteor.subscribe('user').ready();
    const currentUser = Meteor.user();
    return {
        isAuthenticated,
        loading,
        currentUser
    };
}, App);
