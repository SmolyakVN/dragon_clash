import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Input from '../Inputs/Input.js';
import InputPass from '../Inputs/InputPass.js';
import Button from '../Buttons/Button.js';
import classes from './AuthForm.module.css';

function AuthForm() {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [authData, setAuthData] = useState({'login': '', 'pass': ''});
    const [notification, setNotification] = useState('');
    const [opacity, setOpacity] = useState(0);
    const navigate = useNavigate();
    let timeout;
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setAuthData((authData) => {
            const updatedAuthData = { ...authData, [name]: value };
            if (value && value.trim() !== '' && updatedAuthData.login.trim() !== '' && updatedAuthData.pass.trim() !== '') {
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true);
            }
            return updatedAuthData;
        });
    }
    const postData = async () => {
        clearTimeout(timeout);
        setOpacity(0);
        const url = `https://ip-skolkovo.ru/api/login?l=${authData.login}&p=${authData.pass}`;
        try {
            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data = await response.json();
            if (data.isSuccess){
                localStorage.setItem('userId', data.guid);
                setNotification('');                
                window.location.reload();               
            } else {
                setOpacity(1);
                setNotification(data.message);
                localStorage.setItem('userId', data.guid);
                timeout = setTimeout(() => {
                    setOpacity(0);
                }, 3000);
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    return (
        <div className={classes['auth-form-body']}>
            <div className={classes['auth-form-div']}>
                <Input placeholder='имя пользователя' name='login' onChange={handleChangeInput}/>
                <InputPass placeholder='пароль' name='pass' onChange={handleChangeInput}/>
                <Button value='ВОЙТИ' type='auth' disabled={buttonDisabled} onClick={postData}/>
            </div>
            <div className={classes['auth-message']} style={{ opacity }} onClick={() => setOpacity(0)}>{notification}</div>
        </div>
    );
}

export default AuthForm;