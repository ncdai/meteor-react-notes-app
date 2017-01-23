import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        if (email && password) {
            Meteor.loginWithPassword(email, password, (err) => {
                if (err) {
                    this.setState({
                        error: err.reason
                    });
                } else {
                    browserHistory.push('/');
                }
            });
        } else {
            this.setState({
                error: 'Please enter email and password'
            });
        }
    }

    render() {
        const error = this.state.error;

        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <h4 className="text-center">Login</h4>
                    {error.length > 0 ? <div className="alert alert-danger fade in">{error}</div> : ''}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="email" id="email" className="form-control" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <input type="password" id="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="form-group text-center">
                            <input type="submit" id="login-button" className="btn btn-primary btn-block" value="Login" />
                        </div>
                        <div className="form-group text-center">
                            <p className="text-center"> Don't have an account? Register <Link to="/register">here</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
