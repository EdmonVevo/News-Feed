import React  from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import Logo from 'assets/images/logo.jpg'
// import CloseEye from 'assets/images/close-eye.png';
// import OpenEye from 'assets/images/open-eye.png';
import './style.scss';
// import axios from 'axios';


class NewsItem extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            isRead:false
        }
    }

    componentDidMount(){
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
    const {isRead} = this.state;
    return (
        <div className='feed_item'>
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
                                isRead ? (
                                    // <img className='unread-news' src={OpenEye} alt=""/>
                                     
                                     <span className="read"/>
                                ) : (
                                    <span className="unread"/>
                                    // <img className='unread-news' src={CloseEye} alt=""/>
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