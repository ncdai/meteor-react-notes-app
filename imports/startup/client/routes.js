import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import App from '../../ui/App.jsx';
import NotesList from '../../ui/NotesList.jsx';
import NotePage from '../../ui/NotePage.jsx';
import Hello from '../../ui/Hello.jsx';

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={NotesList} />
            <Route path="/hello" component={Hello} />
            <Route path="/note/:id" component={NotePage} />
        </Route>
    </Router>
);
