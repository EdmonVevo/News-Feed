import React  from 'react';
import PinItem from './PinItem';
import './style.scss';



const Pin = ({items}) => {

    const hasItems = items.length;
    return (
        <div className={`${hasItems ? 'pin_container' : 'no_pin_container'}`}>
            <div className={`${hasItems ? 'pin_wrapper' : 'no_pin_wrapper'}`}>
                {
                    hasItems ? (
                        items.map((item)=>{
                            return (
                                <PinItem item={item} />
                            )
                        })
                    ) : (
                        <div className='no_pinned_news'>
                            <span>
                                 You have no pinned news
                            </span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Pin;