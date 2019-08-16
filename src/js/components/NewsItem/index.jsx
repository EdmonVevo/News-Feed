import React  from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import Logo from 'assets/images/logo.jpg'
import './style.scss';


class NewsItem extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            isRead:false,
            isPinned:false,
        }
    }

    componentDidMount(){
        const {news} = this.props;
        const {id} = news;
        const pinnedNews = localStorage.getItem('pinnedNews');
        const parsedPinnedNews = JSON.parse(pinnedNews);
        var isPinned;
        parsedPinnedNews.forEach(item=>{
           if(item === '/' + id) {
               isPinned = true;
           }
        })
        if(isPinned){
            this.setState({
                isPinned
            });
        }
       
        this.handleRead();
    }
    
    handleRead = () => {
        const {news} = this.props;
        const {id} = news;
        const isRead = localStorage.getItem(`/${id}`);
        if(isRead) this.setState({ isRead })
    }

    render(){
    const {news} = this.props;
    const {isRead,isPinned} = this.state;
        return (
            <div className='feed_item'>
                {
                    isPinned && (
                        <span className='pinned_helper'>
                            PINNED
                        </span>
                    ) 
                }
                <Link to={`/${news.id}`}>
                    <Card color='violet'>
                        <Image src={news.fields.thumbnail || Logo} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>{news.webTitle}</Card.Header>
                        <div className='category'>
                            <Card.Meta>
                                <span className='date'>Category:&nbsp; </span>
                            </Card.Meta>
                            <Card.Description>
                                {news.sectionName}
                            </Card.Description>
                        </div>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='feed_item_read'>
                                <span>
                                    <Icon name='plus square outline' />
                                    Read more
                                </span>
                                {
                                    news.isNew && (
                                        <span className='new_item'>NEW</span>
                                    )
                                }
                                {
                                    isRead ? (                           
                                        <span className="read"/>
                                    ) : (
                                        <span className="unread"/>
                                    )
                                }
                            </div>
                        </Card.Content>
                    </Card>
                </Link>
            </div>
        )
   }
}


export default NewsItem;