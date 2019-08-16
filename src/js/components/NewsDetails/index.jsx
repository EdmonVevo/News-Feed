import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';
import Sololearn from 'assets/images/sololearn.jpg';
import SoloLearnLoader from 'assets/images/sololearn-loader.png';
import './style.scss';

class NewsDetails extends Component {


    constructor(props){
        super(props);
        this.state = {
            id: window.location.pathname,
            newData:[],
            isLoading:true,
            pinned:false,
            pinnedNews:[],
        }
    }

   async componentDidMount(){

        const { id } = this.state;
        const url = `https://content.guardianapis.com/${id}` ;
        const headers = {
            'Content-Type': 'application/json'
          }

        const apiKey = 'f7224cda-042a-4939-b230-615e9b4cc84f';
          // const apiKey = 'test';
        const params = {
             'api-key': apiKey,
             'show-fields':'all',
        };
        await axios.get(url,{headers:headers,params:params})
        .then(response => response.data )
        .then(data => {
            const { response } = data;
            const { content } = response;
            const isPinned = this.isPinned(id);
            setTimeout(()=>{
                this.setState({
                    newData:content,
                    isLoading:false,
                    isPinned: isPinned ? true : false,
                },()=>{
                   localStorage.setItem(id,true); 
                })
            },300);
    
        }).catch(err =>{
            console.log(err);
        })
    }

    isPinned = (id) => {
        const pinnedNews = localStorage.getItem('pinnedNews');
        let isPinned = false;
        let pinnedNewsParse;

        if(pinnedNews && pinnedNews.length){
            pinnedNewsParse = JSON.parse(pinnedNews);
            pinnedNewsParse.forEach(item=>{
                if(item === id){
                    isPinned = true;
                }
            })
        }
        return isPinned;
    }



    pinToHomePage = () => {
        const { id } = this.state;
        const pinnedNews = localStorage.getItem('pinnedNews');
        let pinnedNewsParse = [];
        if( pinnedNews ) {
            pinnedNewsParse = JSON.parse(pinnedNews);
            pinnedNewsParse.unshift(id);      
        } else {
            pinnedNewsParse.unshift(id);
        }
        const pinnedNewsJSON = JSON.stringify(pinnedNewsParse);
        localStorage.setItem('pinnedNews',pinnedNewsJSON);
        this.setState({
            isPinned:true,
        })
    }

    unPinFromHomepage = () => {
        const { id } = this.state;
        const pinnedNews = localStorage.getItem('pinnedNews');
        let pinnedNewsParse = [];
        if ( pinnedNews && pinnedNews ) {
            pinnedNewsParse = JSON.parse(pinnedNews);
            pinnedNewsParse = pinnedNewsParse.filter(item=>{
                return item !== id
            });
            const pinnedNewsJSON = JSON.stringify(pinnedNewsParse);
            localStorage.setItem('pinnedNews',pinnedNewsJSON);
            this.setState({
                isPinned:false,
            })
        }   
    }


    render(){
        const { newData, isLoading, isPinned} = this.state;
        const { fields:details } = newData;

        if( isLoading ) {
            return (
                <div className='initialLoader'>
                    <img src={SoloLearnLoader} alt=""/>
                </div>
            )
        }
        if( newData.length === 0 ) {
            return null;
        }

        return (      
            <div className='news_details'>
                <div className="news_details_wrapper">
                    <span className='news_details_header'>
                         { newData.webTitle && newData.webTitle}
                    </span>
                    <div className='news_details_thumbnail_wrapper'>
                        {
                            details.main ? (
                                ReactHtmlParser(details.main)
                            ) : (
                                <img src={Sololearn} alt=""/>
                            )
                        }
                      
                    </div>

                    <div className='news_details_content'>
                        <span className='news_details_published_date'>   
                            <i>
                            Published date:&ensp;
                            {
                                details.firstPublicationDate && details.firstPublicationDate.replace('T',' ').replace('Z','')
                            }
                            </i>
                        </span>              
                        <span className='news_details_category'>   
                            <i>
                            Category:&ensp;
                            {
                            ` ${newData.pillarName && newData.pillarName } - 
                                ${newData.sectionName && newData.sectionName}`
                            }
                            </i>
                            
                        </span>
                        <p className='news_details_body'>
                            {details.bodyText && details.bodyText}
                        </p>
                        <span className='news_details_author'>   
                            <i>
                            {
                                details.publication && details.publication
                            }
                            </i>
                        </span>
                        <div className='news_details_webpage_wrapper'>
                            <span className='news_details_production_office'>   
                                <i>
                                {
                                    details.productionOffice && details.productionOffice
                                }
                                </i>
                            </span>
                            <div>
                            <Link to='/'>
                                <Button color='green'>
                                    Go Back
                                </Button>
                            </Link>
                           
                            <Button color='violet'>
                                <a
                                    rel="noopener noreferrer"
                                    className='news_details_visit_webpage'
                                    target='_blank' 
                                    href={newData.webUrl}
                                 >
                                    Visit webpage
                                </a> 
                            </Button>
                            {
                                !isPinned ? (
                                    <Button 
                                        onClick = {this.pinToHomePage}
                                        color='yellow'>
                                        Pin to homepage
                                    </Button>
                                ) : (
                                    <Button 
                                        onClick = {this.unPinFromHomepage}
                                        color='red'>
                                        Unpin from homepage
                                    </Button>
                                )
                            }
                            
                                <span>
                                    {
                                       
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            
            
        )
    }
}


export default NewsDetails;