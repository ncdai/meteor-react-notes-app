import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

// containers
import AppContainer from '../../ui/containers/AppContainer.jsx';

// components
import NotesList from '../../ui/components/NotesList.jsx';
import Hello from '../../ui/components/Hello.jsx';

// pages
import RegisterPage from '../../ui/pages/RegisterPage.jsx';
import LoginPage from '../../ui/pages/LoginPage.jsx';
import NotePage from '../../ui/pages/NotePage.jsx';
import EditorPage from '../../ui/pages/EditorPage.jsx';

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="register" component={RegisterPage} />
        <Route path="login" component={LoginPage} />
        <Route path="/" component={AppContainer}>
            <IndexRoute component={NotesList} />
            <Route path="note/:id" component={NotePage} />
            <Route path="editor" component={EditorPage} />
            <Route path="hello" component={Hello} />
        </Route>
    </Router>
);
