import React,{Component}  from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import PinImage from 'assets/images/pin.png';
import Logo from 'assets/images/logo.jpg'
import './style.scss';



class PinItem extends Component  {
   
    constructor(props) {
        super(props);
        this.state = {
            removePin:false
        }
        this.pinIconRef = React.createRef();
      }

      
    unPin = (e) => {
        const {id} = this.props.item;
        e.preventDefault();
        this.setState({
            removePin:true
        }, ()=>{
           
            setTimeout(()=>{
                this.props.unPin(id);
                this.setState({
                    removePin:false,
                })
            },600)
        })
        
    }


    render () {
        const {item}  = this.props;
        const {removePin} = this.state;
        const { fields } = item;
        return (
            <Link to={`/${item.id}`}>
                <div className='pinned_item'>
                    <img 
                        className={`pin_icon ${removePin  && 'hide_icon'}`}
                        onClick={(e) => this.unPin(e)}
                        src={ PinImage}
                        alt=""/>
                    <Card>
                        <Card.Content>
                            <Image floated='right' size='mini' src={fields.thumbnail || Logo }/>
                            <Card.Header>
                            {fields.headLine && fields.headLine}
                            </Card.Header>
                            <Card.Meta>Click to see more</Card.Meta>
                            <Card.Description>
                                {item.webTitle && item.webTitle}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </div>
            </Link>
        )
    }
}

PinItem.propTypes  = {
    item: PropTypes.object,
    unPin: PropTypes.func,
}
export default PinItem;