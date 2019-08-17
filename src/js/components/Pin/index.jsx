import React  from 'react';
import PropTypes from 'prop-types';
import PinItem from './PinItem';
import './style.scss';



const Pin = ({items,unPin}) => {
    const hasItems = items.length;
    return (
        <div className={`${hasItems ? 'pin_container' : 'no_pin_container'}`}>
            <div className={`${hasItems ? 'pin_wrapper' : 'no_pin_wrapper'}`}>
                {
                    hasItems ? (
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
    )
}

Pin.propTypes  = {
    items: PropTypes.array,
    unPin: PropTypes.func,
}

export default Pin;