import React from 'react';
import { BrowserRouter  as Router,Switch,Route } from 'react-router-dom';
import Home from 'js/components/Home';
// import 'semantic-ui-css/semantic.min.css';

const Routes = () => (
    <Router>
        <Switch>
              <Route path='/' component={Home} />
        </Switch>  
    </Router>
)


export default Routes;