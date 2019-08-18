import React  from 'react';
import { Loader } from 'semantic-ui-react';


const NewsLoader = () => {
    return (
        <div className='loader'>
            <Loader size='huge' active inline='centered' />
        </div>
    )
}
export default NewsLoader;