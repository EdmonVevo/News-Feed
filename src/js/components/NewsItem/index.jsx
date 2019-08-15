import React  from 'react'
import { Card, Icon } from 'semantic-ui-react';
import './style.scss';
// import axios from 'axios';


class NewsItem extends React.Component {
    
    
   render(){
    const {news} = this.props;
    return (
        <div className='feed_item'>
            <Card color='violet'>
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
                <a href='http://google.com'>
                    <Icon name='plus square outline' />
                    See more
                </a>
                </Card.Content>
            </Card>
        </div>
    )
   }
}


export default NewsItem;