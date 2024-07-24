import React, { useRef, useEffect } from 'react';
import classes from "./CardInStack.module.css";

function CardInStack(props) {
    const cardRef = useRef(null);

    useEffect(() => {
        const element = cardRef.current;
        if (element) {
        element.style['z-index'] = `${props.count + 1}`;
        setTimeout(() => {
            element.style.bottom = `${props.count * 0.8}rem`;            
        }, 10);
        }
    }, []);

    const showDescription = () => {
        props.setShowDescription(true);
        props.setDescription(props.value);
        props.setAdditionalDescription('');
    }
    
      const hideDescription = () => {
        props.setShowDescription(false);
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