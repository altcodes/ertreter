import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import UserBoard from './pages/UserBoard';
import ArticleBoard from './pages/ArticleBoard';
import About from './pages/About';
import Auth from './pages/Auth';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Switch>
          <Route exact path='/' component={Auth}></Route>
          <PrivateRoute exact path='/home' component={Dashboard}></PrivateRoute>
          <PrivateRoute
            exact
            path='/user/:email'
            component={UserBoard}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path='/article/:id'
            component={ArticleBoard}
          ></PrivateRoute>
          <Route exact path='/about' component={About}></Route>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
