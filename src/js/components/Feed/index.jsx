import React  from 'react';
import NewsContext from 'NewsContext';
import NewsItem from 'js/components/NewsItem';

import './style.scss';

const Feed = () => {
    return (
        <div className='feed'>
             {
                <NewsContext.Consumer>
                    {({news}) => (
                            news.map((item, i)=>{
                            return (
                                <NewsItem
                                    key = { i.toString()}
                                    news= {item}
                                />
                            )
                        })
                    )}
                </NewsContext.Consumer>          
             }
        </div>
    )
}

export default Feed;