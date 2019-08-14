import React, { Component } from 'react';
import { Route } from 'react-router-dom';


class OpenRoute extends Component {

   render() {
      const { component: ChildComponent, ...rest } = this.props;
      return (
         <div className='PageContainer'>
            <Route
               { ...rest }
               render={ props => {
                  return <ChildComponent { ...props } />;
               } }
            />
         </div>
      );
   }
}

export default OpenRoute;