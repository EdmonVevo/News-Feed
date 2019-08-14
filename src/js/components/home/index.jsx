import React, {Component} from 'react'
import axios from 'axios';
import Feed from 'js/components/feed';


class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            news:{}
        }
    }
    componentDidMount(){
        const url = 'https://content.guardianapis.com/search';
        const headers = {
            'Content-Type': 'application/json'
          }
        const params = {
             'api-key': 'f7224cda-042a-4939-b230-615e9b4cc84f'
        }
        axios.get(url,{headers:headers,params:params})
        .then(response => response.data )
        .then(data => {
            const { response } = data;
            const { results } = response;
            this.setState(()=>{
                return {
                    news:results
                }
            })
        }).catch(err =>{
            console.log(err);
        })
    }

    render(){
        const { news } = this.state;
        return (
            <div>
                <Feed 
                    news = {news} 
                />
            </div>
        )
    }
}


export default Home;