import React  from 'react';
import { Link } from 'react-router-dom';

import { Card, Icon, Image } from 'semantic-ui-react';

import PropTypes from 'prop-types';

import Logo from 'assets/images/logo.jpg'

import './style.scss';


const NewsItem =({ news }) =>{
    
    const {
        isPinned,
        id,
        webTitle,
        sectionName,
        isNew,
        isRead,
        fields,
     } = news;
     const {
         thumbnail,
    } = fields;

    return (
        <div className='feed_item'>
            {
                isPinned && (
                    <span className='pinned_helper'>
                        PINNED
                    </span>
                ) 
            }
            <Link to={`/${id}`}>
                <Card color='violet'>
                    <Image src={thumbnail || Logo} wrapped ui={false} />
                    <Card.Content>
                    <Card.Header>{webTitle}</Card.Header>
                    <div className='category'>
                        <Card.Meta>
                            <span className='date'>Category:&nbsp; </span>
                        </Card.Meta>
                        <Card.Description>
                            {sectionName}
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
                                isNew && (
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

NewsItem.propTypes  = {
    news: PropTypes.object,
}

export default NewsItem;