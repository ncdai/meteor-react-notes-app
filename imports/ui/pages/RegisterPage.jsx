import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

import DocumentTitle from 'react-document-title';

export default class RegisterPage extends Component {
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
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let password_confirmation = document.getElementById('password_confirmation').value;

        if (password === password_confirmation) {
            Accounts.createUser({
                email: email,
                username: username,
                password: password
            }, (err) => {
                if (err) {
                    this.setState({error: err.reason});
                    console.log(err);
                } else {
                    browserHistory.push('/login');
                }
            });
        } else {
            this.setState({error: 'Password confirmation not match'});
        }
    }

    render() {
        const { error } = this.state;

        return (
            <DocumentTitle title="Register">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <h4 className="text-center">Register</h4>
                        <form onSubmit={this.handleSubmit}>
                            {error.length > 0 ? <div className="alert alert-danger fade in">{error}</div> : ''}
                            <div className="form-group">
                                <input type="text" id="username" className="form-control" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <input type="email" id="email" className="form-control" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <input type="password" id="password" className="form-control" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <input type="password" id="password_confirmation" className="form-control" placeholder="Password confirmation" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">Register</button>
                            </div>
                            <div className="form-group">
                                <p className="text-center">
                                    Already have an account? Login <Link to="/login">here</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}
