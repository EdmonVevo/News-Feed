import React  from 'react';
import { Card, Image } from 'semantic-ui-react'
import PinImage from 'assets/images/pin.png';
import './style.scss';



const PinItem = ({item}) => {
    const { fields } = item;
    return (
        <div className='pinned_item'>
             <img className='pin_logo' src={PinImage} alt=""/>
            <Card>
                <Card.Content>
                    <Image floated='right' size='mini' src={fields.thumbnail}/>
                    <Card.Header>
                       {fields.headLine && fields.headLine}
                    </Card.Header>
                    <Card.Meta>Friends of Elliot</Card.Meta>
                    <Card.Description>
                        {item.webTitle && item.webTitle}
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    )
}

export default PinItem;