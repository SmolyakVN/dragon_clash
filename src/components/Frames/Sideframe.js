import React from 'react';
import Stack from "../Stack/Stack.js";
import classes from "./Sideframe.module.css";
import BonusButton from '../Buttons/BonusButton.js';

function Sideframe(props) {
    const stackProps = {
        playerNum: props.playerNum,
        cells: props.cells,
        setDescription: props.setDescription,
        setAdditionalDescription: props.setAdditionalDescription,
        setShowDescription: props.setShowDescription
    }

    return (
        <div className={classes['sideframe']} style={props.playerNum === 2 ? {'flexDirection': 'row-reverse'} : null}>
            <div className={classes['sideframe-main']}>
                <Stack
                    {...stackProps}
                    type="losses"
                ></Stack>
                <Stack
                    {...stackProps}
                    type="wins"
                ></Stack>
                <div className={classes['player-score']} data-player={props.playerNum}>{props.playersScore[props.playerNum]}</div>
                <div className={classes['player-name-div']}>
                    <div className={classes['player-name']} title={props.playerName}>{props.playerName}</div>
                    <div data-player={props.playerNum} className={`${classes['player-underline']} ${props.playerNum === props.currentPlayer ? classes['active'] : ''}`}></div>
                </div>
            </div>
            <div className={classes['sideframe-additional']}>
                {
                    props.bonuses.map((item, i) => (
                        <BonusButton
                            key={i}
                            bonus={item.bonus}
                            icon={item.icon}
                            description={item.description}
                            openedCardsCount={props.openedCardsCount}
                            player={props.playerNum}
                            currentPlayer={props.currentPlayer}
                            setCurrentPlayer={props.setCurrentPlayer}
                            roundIsFinished={props.roundIsFinished}
                            activatedBonuses={props.activatedBonuses}
                            setActivatedBonuses={props.setActivatedBonuses}
                            usedBonuses={props.usedBonuses}
                            notUsedBonuses={props.notUsedBonuses}
                            setUsedBonuses={props.setUsedBonuses}
                            spyActive={props.spyActive}
                            setSpyActive={props.setSpyActive}
                            setDescription={props.setDescription}
                            setAdditionalDescription={props.setAdditionalDescription}
                            setShowDescription={props.setShowDescription}
                            gettingBonusesList={props.gettingBonusesList}
                            bonusesPoints={props.bonusesPoints}
                            // playersScore={props.playersScore}
                            // setPlayersScore={props.setPlayersScore}
                        ></BonusButton>
                    ))
                }
            </div>
        </div>
    );
}

export default Sideframe;