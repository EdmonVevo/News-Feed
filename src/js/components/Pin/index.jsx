import React  from 'react';
import PinItem from './PinItem';
import NewsContext from 'NewsContext';
import './style.scss';



const Pin = () => {
    return (
        <NewsContext.Consumer>
              {({items,unPin}) => (
                <div className={`${items.length ? 'pin_container' : 'no_pin_container'}`}>
                    <div className={`${items.length ? 'pin_wrapper' : 'no_pin_wrapper'}`}>
                        {
                            items.length ? (
                                items.map((item,i)=>{
                                    return (
                                        <PinItem 
                                            key={i.toString()}
                                            item={item} 
                                            unPin={unPin}
                                        />
                                    )
                                })
                            ) : (
                                <div className='no_pinned_news'>
                                    <span>
                                        Pin news to add here
                                    </span>
                                </div>
                            )
                        }
                    </div>
                </div>
              )}     
        </NewsContext.Consumer>
    )
}

export default Pin;