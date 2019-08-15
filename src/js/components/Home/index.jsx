import React, {Component} from 'react';
import axios from 'axios';
import Feed from 'js/components/Feed';
import Pin from 'js/components/Pin';
import NewsLoader from 'js/components/NewsLoader';
import SoloLearnLoader from 'assets/images/sololearn-loader.png';
import './style.scss'

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            news:[],
            page:1,
            isScrolling:true,
            isLoading:true,
            totalPagesFromApi:null,
            pinnedNews:[],
        }
    }

    componentWillMount() {
        this.loadNews();
        window.addEventListener('scroll', (e) => { this.handleScroll(e)})
    }

    handleScroll = () => {
        const { isScrolling, totalPagesFromApi, page } = this.state;
        if ( isScrolling ) return ;
        if( totalPagesFromApi === page ) return;
        const lastNews = document.querySelector('.feed_item:last-child');
        if(lastNews){
            const lastNewsOffset = lastNews.offsetTop + lastNews.clientHeight;
            const pageOffset = window.pageYOffset + window.innerHeight;
            if(pageOffset > lastNewsOffset) this.loadMore();
        }
       
    }

    async loadNews(){
        const { page,news,pinnedNews } = this.state ;
        const url = 'https://content.guardianapis.com/search';
        const headers = {
            'Content-Type': 'application/json'
          }
        const apiKey = 'f7224cda-042a-4939-b230-615e9b4cc84f';
        // const apiKey = 'test';
        const params = {
             'api-key': apiKey,
             'show-fields':'all',
             'page':page
        }
       
        await axios.get(url,{headers:headers,params:params})
        .then(response => response.data )
        .then(data => {
            const { response } = data;
            const { results } = response;
            
            const pinnedItems = results.filter(news => {
                const pinnedEl = localStorage.getItem('pinned/' + news.id);
                return pinnedEl;
            })
            this.setState({
                news:[...news,...results],
                isScrolling:false,
                isLoading:false,
                totalPagesFromApi:response.total,
                pinnedNews:[...pinnedNews,...pinnedItems]
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
        const { 
            news,
            isScrolling,
            isLoading,
            pinnedNews
         } = this.state;


        if(isLoading) {
            return (
               <div class='initialLoader'>
                   <img src={SoloLearnLoader} alt=""/>
               </div>
            )
        }
        return (
            <div className='container'>
                <Pin
                    items ={ pinnedNews }/>
                <Feed 
                    news = { news } 
                />
                {isScrolling && (
                    <NewsLoader/>
                )}
            </div>         
        )
    }
}


export default Home;