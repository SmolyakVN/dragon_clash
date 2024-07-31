import React, { useRef, useEffect } from 'react';
import classes from "./CardInStack.module.css";
import { useAppContext } from '../../AppProvider.jsx';

function CardInStack(props) {
    const {setDescription, setAdditionalDescription, setShowDescription} = useAppContext();
    const cardRef = useRef(null);

    useEffect(() => {
        const element = cardRef.current;
        if (element) {
        element.style['z-index'] = `${props.count + 1}`;
        setTimeout(() => {
            if (window.innerWidth <= 768){
              element.style.left = `${props.count * 1.5}rem`;  
            } else {
              element.style.bottom = `${props.count * 1.5}rem`;  
            }         
        }, 10);
        }
    }, []);

    const showDescription = () => {
        setShowDescription(true);
        setDescription(props.value);
        setAdditionalDescription('');
    }
    
      const hideDescription = () => {
        setShowDescription(false);
    }
    
    return (
        <div ref={cardRef} className={classes['card']} data-type={props.type} onMouseEnter={showDescription} onMouseLeave={hideDescription}>
          <div className={classes['card-body']}>
            <div className={classes['card-value']}>{props.value}</div>
            <div className={classes['card-label']}>{props.value}</div>
          </div>
        </div>
    );
}

export default CardInStack;