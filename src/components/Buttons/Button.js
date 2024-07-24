import React from 'react';
import classes from './Button.module.css';

function Button(props){
    return (
        <button className={classes[`button-${props.type}`]} onClick={props.onClick} disabled={props.disabled === true ? true : false}>{props.value}</button>
    );
}

export default Button;