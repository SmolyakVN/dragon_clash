import React, { useRef, useEffect } from 'react';
import classes from "./CardInStack.module.css";
import { useAppContext } from '../../AppProvider.jsx';

function CardInStack(props) {
    const {setDescription, setAdditionalDescription, setShowDescription, setShowModal, setModalValue} = useAppContext();
    const cardRef = useRef(null);

    useEffect(() => {
        const element = cardRef.current;
        if (element) {
        element.style['z-index'] = `${props.count + 1}`;
        setTimeout(() => {
            if (window.innerWidth <= 768){
              element.style.left = `${props.count * 0.75}rem`;  
            } else {
              element.style.bottom = `${props.count * 1.5}rem`;  
            }         
        }, 10);
        }
    }, []);

    const showDescription = () => {
        setShowDescription(true);
        setDescription(props.name);
        setAdditionalDescription('');
    }
    
      const hideDescription = () => {
        setShowDescription(false);
    }

    const showModal = (value, type) => {
      setShowModal(true);
      setModalValue(prevValues => {
        return {
          ...prevValues,
          value,
          type
        }
      });
    }
    
    return (
        <div ref={cardRef} className={classes['card']} data-type={props.type} onMouseEnter={showDescription} onMouseLeave={hideDescription}>
          <div 
            className={classes['card-body']}
            style={{'backgroundImage': `url('${process.env.PUBLIC_URL}/Images/Dragons/${props.img}_${props.type}.jpg')`}}
            onClick={() => showModal(props.img, props.type)}>
            <div className={classes['card-label']}>{props.value}</div>
          </div>
        </div>
    );
}

export default CardInStack;