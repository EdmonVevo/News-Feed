import React from 'react';
import { BrowserRouter  as Router,Switch,Route } from 'react-router-dom';
import Home from 'js/components/home';

const Routes = () => (
    <Router>
        <Switch>
              <Route path='/' component={Home} />
        </Switch>  
    </Router>
)


export default Routes;