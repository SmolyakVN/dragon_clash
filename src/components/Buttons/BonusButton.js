import React from 'react';
import classes from './BonusButton.module.css';
import sword from '../Icons/sword.svg';
import shield from '../Icons/shield.svg';
import spyglass from '../Icons/spyglass.svg';
import x2 from '../Icons/x2.svg';
import change from '../Icons/change.svg';
import classesSidebar from "../Frames/Sideframe.module.css";

function BonusButton(props) {
    const icons = {sword, shield, spyglass, x2, change};

    const bonusButtonClickHandler = (e) => {
        let activatedBonuses = props.activatedBonuses;
        let bonus = e.currentTarget.getAttribute("data-bonus");
        if (e.currentTarget.classList.contains(classes['access']) && props.openedCardsCount === 0){
            if (activatedBonuses.find(i => i.bonus === bonus)){            
                activatedBonuses.splice(activatedBonuses.findIndex(i => i.bonus === bonus), 1);
                props.setActivatedBonuses([...activatedBonuses]);
                if (bonus === 'spy'){
                    props.setSpyActive(false);
                }
            } else {
                if (bonus === 'change'){
                    hideDescription();
                    props.setUsedBonuses(prevUsedBonuses => [...prevUsedBonuses, {'bonus': 'change', 'player': props.currentPlayer}]);
                    props.setActivatedBonuses([]);
                    let enemyPlayer = props.currentPlayer === 1 ? 2 : 1;
                    props.setCurrentPlayer(enemyPlayer);
                    document.querySelector(`.${classesSidebar['player-underline']}[data-player="${props.currentPlayer}"]`).classList.remove(classesSidebar['active']);
                    document.querySelector(`.${classesSidebar['player-underline']}[data-player="${enemyPlayer}"]`).classList.add(classesSidebar['active']);
                } else {
                    props.setActivatedBonuses(prevBonuses => [...prevBonuses, {'bonus': bonus, 'player': props.currentPlayer}]);
                    if (bonus === 'spy'){
                        props.setSpyActive(true);
                    }
                }
            }
        }
    }
    
    let additionalClasses = '';
    let additionalDescription = '(+1 в конце раунда)';
    
    if (props.usedBonuses.findIndex(i => (i.bonus === props.bonus && i.player === props.player)) === -1){
        if (props.player === props.currentPlayer && !props.roundIsFinished){
            if (props.openedCardsCount === 0){
                additionalClasses += classes['access'];
            } else {
                additionalClasses += classes['available'];
            }
            if (props.activatedBonuses.findIndex(i => i.bonus === props.bonus) > -1){
                additionalClasses += ` ${classes['active']}`
            }
        } else {
            additionalClasses += classes['available'];
        }
    }

    if (props.roundIsFinished && props.bonus === 'change'){
        additionalClasses = '';
    }

    const clickHandler = (props.player === props.currentPlayer && !props.roundIsFinished) ? bonusButtonClickHandler : null;

    const showDescription = () => {
        if (additionalClasses.match(/access/g)){
            props.setShowDescription(true);
            props.setDescription(props.description);
            props.setAdditionalDescription(additionalDescription);
        }
    }
    
      const hideDescription = () => {
        props.setShowDescription(false);
    }

    let labelOpacity = '0';
    let labelPoints = '0';

    if (props.bonus !== 'change'){
        if (props.gettingBonusesList.includes(props.bonus) && props.bonusesPoints[props.bonus][props.player] > 0){
            labelOpacity = '1';
            labelPoints = props.bonusesPoints[props.bonus][props.player];
        }
        let findedIndex = props.notUsedBonuses.findIndex(item => item.bonus === props.bonus && item.player === props.player);
        if (findedIndex > -1){
            additionalDescription = `(+${props.notUsedBonuses[findedIndex].count + 1} в конце раунда)`;
        }
    } else {
        additionalDescription = '';
    }

    return (
        <div className={`
                ${classes['bonus-button']} ${additionalClasses}`} data-player={props.player} data-bonus={props.bonus} onClick={clickHandler} onMouseEnter={showDescription} onMouseLeave={hideDescription}>
            <div className={`
                    ${classes['bonus-button-body']} ${additionalClasses}`} style={{'maskImage': `url(${icons[props.icon]})`}}></div>
            <div className={`${classes['bonus-button-points-label']}`} style={{'opacity': labelOpacity}} data-player={props.player}>+{labelPoints}</div>
        </div>
    );
}

export default BonusButton;