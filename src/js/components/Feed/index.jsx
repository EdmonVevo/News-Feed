import React, {Component} from 'react'
import NewsItem from 'js/components/NewsItem';
import './style.scss';

class Feed extends Component {

    render(){
    const { news } = this.props;
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
}


export default Feed;