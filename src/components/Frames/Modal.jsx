import React from "react";
import classes from "./Modal.module.css";
import { useAppContext } from '../../AppProvider.jsx';

const Modal = () => {
    const {
        showModal, setShowModal,
        modalValue,
        showModalDescription, setShowModalDescription,
        dragonsList
    } = useAppContext();

    const modalDescriptionHandler = () => {
        setShowModalDescription(!showModalDescription);
    }

    const showModalHandler = () => {
        setShowModal(!showModal);
    }

    const frameClickHandler = (e) => {
        if (e.target.className === classes['modal-frame'] || e.target.className === classes['modal-buttons-div']){
            setShowModal(!showModal);
        }
    }

    return (
        showModal ? (
            <div 
                className={classes['modal-frame']}
                onClick={(e) => frameClickHandler(e)}>
                <div className={classes['modal-buttons-div']}>
                    <div 
                        className={`${classes['modal-button']} ${classes.info} ${showModalDescription ? classes.active : ''}`}
                        onClick={modalDescriptionHandler}>
                    </div>
                    <div 
                        className={`${classes['modal-button']} ${classes.close}`}
                        onClick={showModalHandler}>
                    </div>
                </div>
                <div 
                    className={classes['modal-body']} 
                    style={{'backgroundImage': `url('${process.env.PUBLIC_URL}/Images/Dragons/${modalValue.value}_${modalValue.type}.jpg')`}}>
                    <div className={classes['modal-description-div']} style={{'opacity': showModalDescription ? 1 : 0}}>
                        <div className={classes['modal-description-title']}>
                            {dragonsList[modalValue.type - 1][modalValue.value - 1].name} – {dragonsList[modalValue.type - 1][modalValue.value - 1].originalName}
                        </div>
                        <div className={classes['modal-description-alias']}>
                            {dragonsList[modalValue.type - 1][modalValue.value - 1].alias}
                        </div>
                        <div className={classes['modal-description-text']}>
                            {dragonsList[modalValue.type - 1][modalValue.value - 1].description}
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    )
}

export default Modal;