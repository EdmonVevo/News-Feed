import React, {Component } from 'react';
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
            total:null,
            pinnedNews:[],
        }
    }
    

    componentDidMount(){
     
        // localStorage.removeItem('pinnedNews');
        this.getPinnedNews();
        this.loadNews();
        this.intervalId = setInterval(this.timer, 30000);
        window.addEventListener('scroll', (e) => { this.handleScroll(e)})
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
     }
     
    timer = () => {
        const { page,total } = this.state ;
        const url = 'https://content.guardianapis.com/search';
        const apiKey = 'f7224cda-042a-4939-b230-615e9b4cc84f';
        // const apiKey = 'test';
        const params = {
             'api-key': apiKey,
             'show-fields':'all',
             'page':page,
             'format':'json',
        }
        axios.get(url,{params:params})
        .then(response => response.data )
        .then(data => {
            const { response } = data;
            let { results } = response;
            const allNews = [...this.state.news];
            if(response.total - total > 0){
                const newsCount = response.total - total;
                for(var i = newsCount - 1; i >= 0; i--){
                    let item = results[i];
                    item.isNew = true;
                    allNews.unshift(item);
                }
                this.setState({
                    news:allNews
                })
            }
            
            this.setState({
                total:response.total
            })
        });
     }

    handleScroll = () => {
        const { isScrolling, total, page } = this.state;
        if ( isScrolling ) return ;
        if( total === page ) return;
        const lastNews = document.querySelector('.feed_item:last-child');
        if(lastNews){
            const lastNewsOffset = lastNews.offsetTop + lastNews.clientHeight;
            const pageOffset = window.pageYOffset + window.innerHeight;
            if(pageOffset > lastNewsOffset) this.loadMore();
        }
       
    }

    async loadNews(){
        const { page,news } = this.state ;
        const url = 'https://content.guardianapis.com/search';
        const apiKey = 'f7224cda-042a-4939-b230-615e9b4cc84f';
        // const apiKey = 'test';
        const params = {
             'api-key': apiKey,
             'show-fields':'all',
             'page':page,
             'format':'json',
        }
        
        await axios.get(url,{params:params})
        .then(response => response.data )
        .then(data => {
            const { response } = data;
            const { results } = response;
            this.setState({
                news:[...news,...results],
                isScrolling:false,
                isLoading:false,
                total:response.total,
            })
        }).catch(err =>{
            console.log(err);
        })
    }


    async getPinnedNews(){
        
        const pinnedNewsFromStorage = localStorage.getItem('pinnedNews');
        const pinnedNewsParse = JSON.parse(pinnedNewsFromStorage);
        let pinnedNews = [];
        const url = 'https://content.guardianapis.com';
        const apiKey = 'f7224cda-042a-4939-b230-615e9b4cc84f';
          // const apiKey = 'test';
        const params = {
            'api-key': apiKey,
            'show-fields':'all',
            'format':'json',
       }

        if( pinnedNewsParse && pinnedNewsParse.length ) {
             pinnedNewsParse.forEach((id) => {
                 axios.get(url+id,{params:params})
                .then(response => response.data )
                .then(data => {
                    const { response } = data;
                    const { content } = response;
                    pinnedNews.push(content);
                    return;
                })
            })    
            this.setState({
                pinnedNews,
             }); 
        }
    }

    handleUnpin = (id) => {
        this.unPinNews(id);
    }


    unPinNews = (id) => {
        const pinnedNewsFromStorage = localStorage.getItem('pinnedNews');
        let pinnedNewsParse = JSON.parse(pinnedNewsFromStorage);
        const { pinnedNews } = this.state;
        if( pinnedNewsParse && pinnedNewsParse.length ) { 
            pinnedNewsParse = pinnedNewsParse.filter((item)=>{
                return item !== '/' + id
            })
        }
        const clearedPinedNews = pinnedNews.filter((item)=>{
            return item.id !== id
        });
        this.setState({
            pinnedNews:clearedPinedNews
        },()=>{
            pinnedNewsParse = JSON.stringify(pinnedNewsParse);
            localStorage.setItem('pinnedNews',pinnedNewsParse);
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
               <div className='initialLoader'>
                   <img src={SoloLearnLoader} alt=""/>
               </div>
            )
        }
        return (
            <div className='container'>
                <Pin
                    unPin = { this.handleUnpin }
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