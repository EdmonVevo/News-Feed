import React  from 'react';
import PropTypes from 'prop-types';

import NewsItem from 'js/components/NewsItem';

import './style.scss';

const Feed = ({news}) => {
    return (
        <div className='feed'>
             {
                news.map((item, i)=>{
                    return (
                        <NewsItem
                            key = { i.toString()}
                            news= {item}
                        />
                    )
                })
             }
        </div>
    )
}

Feed.propTypes  = {
    news: PropTypes.array,
}

export default Feed;