import React, {Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import {getNewsRequest , getPinnedNewsRequest} from 'js/api';

import Feed from 'js/components/Feed';
import Pin from 'js/components/Pin';
import NewsLoader from 'js/components/NewsLoader';
import NewsContext from 'NewsContext';
import SoloLearnLoader from 'assets/images/sololearn-loader.png';
import SoloLearnNewsLogo from 'assets/images/sololearn-logo.png';
import ArrowTopIcon from 'assets/icons/arrow.png';

import 'react-toastify/dist/ReactToastify.css';
import './style.scss';



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
            showScrollTop:false
        }
    }
    
    async componentDidMount(){
        this.getPinnedNews();
        await this.loadNews();
        this.intervalId = setInterval(this.getFreshNews, 3000);
        window.addEventListener('scroll', (e) => { this.handleScroll(e)},false);
    }


    componentWillUnmount() {
        clearInterval(this.intervalId);
        window.removeEventListener('scroll',(e) => { this.handleScroll(e)},false);
     }
    
     
    //  GET ALL NEWS
    loadNews(){   
        const { page,news } = this.state ;
        getNewsRequest(page).then(res=>{
            const { results, response } = res;
            const pinnedNewsFromStorage = localStorage.getItem('pinnedNews');
            let pinnedNewsParse = JSON.parse(pinnedNewsFromStorage) || [];
            // CHECK PINNED NEWS FOR FEED
            const allNews = [...news,...results];
            allNews.forEach(news=>{
                const isRead = localStorage.getItem(`/${news.id}`);    
                news.isPinned = pinnedNewsParse.includes(`/${news.id}`);
                news.isRead = !!isRead;
            })   
            this.setState({
                news:allNews,
                isScrolling:false,
                isLoading:false,
                total:response.total,
            })
        }).catch(err =>{
            console.log(err);
        });
    }

    // GET PINNED NEWS FOR PINNED SECTION 
    getPinnedNews(){      
        const pinnedNewsFromStorage = localStorage.getItem('pinnedNews');
        const pinnedNewsParse = JSON.parse(pinnedNewsFromStorage);
        let pinnedNews = [];
        if( pinnedNewsParse && pinnedNewsParse.length ) {
             pinnedNewsParse.forEach((id) => {
                getPinnedNewsRequest(id)
                .then( res =>{
                    pinnedNews.push(res);
                })
                .catch( err => {
                    console.log(err);
                });
            })    
            this.setState({
                pinnedNews,
            }); 
        }
    }

    // GET FRESH NEWS FOR 30 MINUTES UPDATE
    getFreshNews = () => {
        let { page,total } = this.state ;
        getNewsRequest(page).then(res=>{
            const { results, response } = res;
            total = total == null ? response.total : total;
            if(response.total - total > 0){
                const newsCount = response.total - total;
                const allNews = [...this.state.news];
                this.alertFreshNews(newsCount);
                for(var i = newsCount - 1; i >= 0; i--){
                    let item = results[i];
                    item.isNew = true;
                    allNews.unshift(item);
                }
                this.setState({
                    news:allNews
                },this.scrollToTop(100))
            }    
            this.setState({
                total:response.total
            })   
        }).catch(err =>{
            console.log(err);
        });
     }

    // SHOW SCROLL TO TOP BUTTON 
    checkWindowPosition = () => {
        const windowPos = window.scrollY;
        if( windowPos > 500 ) this.setState({showScrollTop:true})
        else  this.setState({showScrollTop:false});
    }

    //  HANDLE WINDOW SCROLL EVENT
    handleScroll = () => {
        const { isScrolling, total, page } = this.state;
        if ( isScrolling ) return ;
        if( total === page ) return;

        this.checkWindowPosition();
        const lastNews = document.querySelector('.feed_item:last-child');
        if(lastNews){
            // DETECT WINDOW IS SCROLLED UNTIL LAST ELEMENT, THEN LOAD MORE DATA
            const lastNewsOffset = lastNews.offsetTop + lastNews.clientHeight;
            const pageOffset = window.pageYOffset + window.innerHeight;
            if(pageOffset > lastNewsOffset) this.loadMore();
        }     
    }
  

    handleUnpin = (id) => {
        this.unPinNews(id);
    }

    unPinNews = (id) => {
        const { pinnedNews, news } = this.state;
        const pinnedNewsFromStorage = localStorage.getItem('pinnedNews');
        let pinnedNewsParse = JSON.parse(pinnedNewsFromStorage);
        
        // REMOVE UNPINNED ELEMENT
        if( pinnedNewsParse && pinnedNewsParse.length ) { 
            pinnedNewsParse = pinnedNewsParse.filter((item)=>{
                return item !== `/${id}`
            })
        }
        news.forEach((item)=>{
            if(item.id === id){
                item.isPinned = false
            }
        })
        const clearedPinedNews = pinnedNews.filter((item)=>{
            return item.id !== id
        });
        
        pinnedNewsParse = JSON.stringify(pinnedNewsParse);
        localStorage.setItem('pinnedNews',pinnedNewsParse);
        this.setState({
            pinnedNews:clearedPinedNews,
            news
        });      
    }

    // GET CURRENT PAGE AND LOAD MORE PAGE
    loadMore = () => {
        const { page } = this.state;
        this.setState({
            page:page + 1,
            isScrolling:true,
        },this.loadNews)
    }

    //  SCROLL WINDOW TO TOP OR TO FRESH NEWS
    scrollToTop = (position = 0) => {
        window.scrollTo({
            top:position,
            behavior: "smooth"
        });
    }

    // TOAST FOR ALERTING ABOUT FRESH NEWS
    alertFreshNews = (newCount)  => {
        toast(`Hey you have ${newCount} fresh news`);
    }

    render(){
        const { 
            news,
            isScrolling,
            isLoading,
            pinnedNews,
            showScrollTop
         } = this.state;

        if(isLoading) {
            return (
               <div className='initialLoader'>
                   <img src={SoloLearnLoader} alt=""/>
               </div>
            )
        }
        
        return (         
            <NewsContext.Provider value={{
                unPin:this.handleUnpin,
                items:pinnedNews,
                news:news,
            }}>          
                <div className='container'>
                    <ToastContainer />
                    <img src={SoloLearnNewsLogo} className='sololearnNewsLogo' alt="SoloLearnNews"/>
                    <Pin/>
                    <Feed/>
                    {
                        !news.length && (
                            <div className='no_news'>
                                <span>NO NEWS</span>
                            </div>
                        )
                    }
                    {isScrolling && (
                        <NewsLoader/>
                    )}

                    <div
                        role='presentation'
                        onClick ={this.scrollToTop}
                        className={`scroll_top ${showScrollTop ? 'show_scroll_top' : ''}`}>
                        <img src={ArrowTopIcon } alt=""/>
                    </div>
                </div>   
            </NewsContext.Provider>      
        )
    }
}


export default Home;