import React from 'react';
import classes from './Middleframe.module.css';

function Description(props) {
    return (
        <div className={`${classes["middleframe-information"]} ${classes["description"]}`} style={{'opacity': props.showDescription ? '1' : '0'}}>
                {props.description}
            <p className={classes['additional-description']}>
                {props.additionalDescription !== '' ? props.additionalDescription : ''}
            </p>
        </div>
    );
}

export default Description;