import React from 'react';
import { BrowserRouter  as Router,Switch,Route } from 'react-router-dom';
import Home from 'js/components/Home';
import NewsDetails from 'js/components/NewsDetails';
// import 'semantic-ui-css/semantic.min.css';

const Routes = () => (
    <Router>
        <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/:id' component={ NewsDetails } />
        </Switch>  
    </Router>
)


export default Routes;