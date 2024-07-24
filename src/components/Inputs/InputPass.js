import React, {useState} from 'react';
import classes from './Input.module.css';

function InputAuth(props){
    const [isPassword, setIsPassword] = useState(true);
    const handleClick = () => {
        setIsPassword(!isPassword);
    }
    return (
        <div className={classes['input-group']}>
            <input name={props.name} placeholder={props.placeholder} type={isPassword ? 'password' : 'text'} onChange={props.onChange} autoComplete='off'></input>
            <div className={`${classes['input-icon']} ${classes[`${isPassword ? 'eye' : 'eye-off'}`]}`} onClick={handleClick}></div>
        </div>
    );
}

export default InputAuth;