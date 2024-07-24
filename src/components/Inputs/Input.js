import React from 'react';
import classes from './Input.module.css';

function Input(props){
    return (
        <input name={props.name} placeholder={props.placeholder} type={props.type ? props.type : 'text'} onChange={props.onChange} autoComplete='off'></input>
    );
}

export default Input;