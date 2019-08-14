import React, {Component} from 'react'
import axios from 'axios';


class Feed extends Component {

    constructor(props){
        super(props);
        this.state = {
            feed:{}
        }
    }


    render(){
    const { news } = this.props;
        return (
            <div>
                Feed
            </div>
        )
    }
}


export default Feed;