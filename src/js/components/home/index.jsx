import React, {Component} from 'react'
import axios from 'axios';
import Feed from 'js/components/Feed';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            news:[],
            page:1,
            isScrolling:false,
            totalPagesFromApi:null,
        }
    }
    
    componentWillMount() {
        this.loadNews();
        window.addEventListener('scroll', (e) => { this.handleScroll(e)})
    }

    handleScroll = () => {
        const { isScrolling, totalPagesFromApi, page } = this.state;

        if (isScrolling) return ;
        if(totalPagesFromApi === page ) return;
        const lastNews = document.querySelector('.feed_item:last-child');
        const lastNewsOffset = lastNews.offsetTop + lastNews.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        if(pageOffset > lastNewsOffset) this.loadMore();
    }

    async loadNews(){
        const { page,news } = this.state ;
        const url = 'https://content.guardianapis.com/search';
        const headers = {
            'Content-Type': 'application/json'
          }
        const params = {
             'api-key': 'f7224cda-042a-4939-b230-615e9b4cc84f',
             'page':page
        }
       
        await axios.get(url,{headers:headers,params:params})
        .then(response => response.data )
        .then(data => {
            const { response } = data;
            const { results } = response;
            console.log(response);
            this.setState({
                news:[...news,...results],
                isScrolling:false,
                totalPagesFromApi:response.total,
            })
        }).catch(err =>{
            console.log(err);
        })
    }

    loadMore = () => {
        const { page } = this.state;
        this.setState({
            page:page + 1,
            isScrolling:true,
        },this.loadNews)
    }

    render(){
        const { news,isScrolling } = this.state;
        return (
        
              <div>
                    <Feed 
                        news = {news} 
                    />
                   {isScrolling && (
                       <div>
                           isScrolling
                       </div>
                   )}
              </div>
            
        )
    }
}


export default Home;