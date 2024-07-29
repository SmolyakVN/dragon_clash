import React from 'react';
import classes from './BonusButton.module.css';
import sword from '../Icons/sword.svg';
import shield from '../Icons/shield.svg';
import spyglass from '../Icons/spyglass.svg';
import x2 from '../Icons/x2.svg';
import change from '../Icons/change.svg';
import classesSidebar from '../Frames/Sideframe.module.css';
import { useAppContext } from '../../AppProvider';

function BonusButton(props) {
    const {
        activatedBonuses, setActivatedBonuses, 
        openedCardsCount, setSpyActive, 
        usedBonuses, setUsedBonuses,
        currentPlayer, setCurrentPlayer,
        roundIsFinished,
        setShowDescription,
        setDescription,
        setAdditionalDescription,
        bonusesPoints,
        gettingBonusesList,
        notUsedBonuses
    } = useAppContext();
    
    const icons = {sword, shield, spyglass, x2, change};

    const bonusButtonClickHandler = (e) => {
        let bonus = e.currentTarget.getAttribute('data-bonus');
        if (
            e.currentTarget.classList.contains(classes['access']) &&
            openedCardsCount === 0
        ) {
            if (activatedBonuses.find((i) => i.bonus === bonus)) {
                activatedBonuses.splice(activatedBonuses.findIndex((i) => i.bonus === bonus), 1);
                setActivatedBonuses([...activatedBonuses]);
                if (bonus === 'spy') {
                    setSpyActive(false);
                }
            } else {
                if (bonus === 'change') {
                    hideDescription();
                    setUsedBonuses((prevUsedBonuses) => [
                        ...prevUsedBonuses,
                        { bonus: 'change', player: currentPlayer },
                    ]);
                    setActivatedBonuses([]);
                    let enemyPlayer = currentPlayer === 1 ? 2 : 1;
                    setCurrentPlayer(enemyPlayer);
                    document
                        .querySelector(`.${classesSidebar['player-underline']}[data-player="${currentPlayer}"]`)
                        .classList.remove(classesSidebar['active']);
                    document
                        .querySelector(`.${classesSidebar['player-underline']}[data-player="${enemyPlayer}"]`)
                        .classList.add(classesSidebar['active']);
                } else {
                    setActivatedBonuses((prevBonuses) => [
                        ...prevBonuses,
                        { bonus: bonus, player: currentPlayer },
                    ]);
                    if (bonus === 'spy') {
                        setSpyActive(true);
                    }
                }
            }
        }
    };

    let additionalClasses = '';
    let additionalDescription = '(+1 в конце раунда)';

    if (usedBonuses.findIndex((i) => i.bonus === props.bonus && i.player === props.player) === -1) {
        if (props.player === currentPlayer && !roundIsFinished) {
            if (openedCardsCount === 0) {
                additionalClasses += classes['access'];
            } else {
                additionalClasses += classes['available'];
            }
            if (
                activatedBonuses.findIndex(
                    (i) => i.bonus === props.bonus
                ) > -1
            ) {
                additionalClasses += ` ${classes['active']}`;
            }
        } else {
            additionalClasses += classes['available'];
        }
    }

    if (roundIsFinished && props.bonus === 'change') {
        additionalClasses = '';
    }

    const clickHandler =
        props.player === currentPlayer && !roundIsFinished
            ? bonusButtonClickHandler
            : null;

    const showDescription = () => {
        if (additionalClasses.match(/access/g)) {
            setShowDescription(true);
            setDescription(props.description);
            setAdditionalDescription(additionalDescription);
        }
    };

    const hideDescription = () => {
        setShowDescription(false);
    };

    let labelOpacity = '0';
    let labelPoints = '0';

    if (props.bonus !== 'change') {
        if (
            gettingBonusesList.includes(props.bonus) &&
            bonusesPoints[props.bonus][props.player] > 0
        ) {
            labelOpacity = '1';
            labelPoints = bonusesPoints[props.bonus][props.player];
        }
        let findedIndex = notUsedBonuses.findIndex(
            (item) => item.bonus === props.bonus && item.player === props.player
        );
        if (findedIndex > -1) {
            additionalDescription = `(+${notUsedBonuses[findedIndex].count + 1} в конце раунда)`;
        }
    } else {
        additionalDescription = '';
    }

    return (
        <div
            className={`${classes['bonus-button']} ${additionalClasses}`}
            data-player={props.player}
            data-bonus={props.bonus}
            onClick={clickHandler}
            onMouseEnter={showDescription}
            onMouseLeave={hideDescription}
        >
            <div
                className={`${classes['bonus-button-body']} ${additionalClasses}`}
                style={{ maskImage: `url(${icons[props.icon]})` }}
            ></div>
            <div
                className={`${classes['bonus-button-points-label']}`}
                style={{ opacity: labelOpacity }}
                data-player={props.player}
            >
                +{labelPoints}
            </div>
        </div>
    );
}

export default BonusButton;
