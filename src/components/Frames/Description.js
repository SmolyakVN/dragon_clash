import React from 'react';
import classes from './Description.module.css';
import { useAppContext } from '../../AppProvider';

function Description(props) {
    const {description, showDescription, additionalDescription} = useAppContext();
    return (
        <div className={`${classes["description"]}`} style={{'opacity': showDescription ? '1' : '0'}}>
                {description}
            <p className={classes['additional-description']}>
                {additionalDescription !== '' ? additionalDescription : ''}
            </p>
        </div>
    );
}

export default Description;