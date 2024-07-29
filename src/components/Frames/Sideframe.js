import React from 'react';
import Stack from "../Stack/Stack.js";
import classes from "./Sideframe.module.css";
import BonusButton from '../Buttons/BonusButton.js';
import { useAppContext } from '../../AppProvider.jsx';

function Sideframe(props) {
    const stackProps = {
        playerNum: props.playerNum,
        cells: props.cells
    }

    const {playersScore, currentPlayer, bonuses} = useAppContext();

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
                <div className={classes['player-score']} data-player={props.playerNum}>{playersScore[props.playerNum]}</div>
                <div className={classes['player-name-div']}>
                    <div className={classes['player-name']} title={props.playerName}>{props.playerName}</div>
                    <div data-player={props.playerNum} className={`${classes['player-underline']} ${props.playerNum === currentPlayer ? classes['active'] : ''}`}></div>
                </div>
            </div>
            <div className={classes['sideframe-additional']}>
                {
                    bonuses.map((item, i) => (
                        <BonusButton
                            key={i}
                            bonus={item.bonus}
                            icon={item.icon}
                            description={item.description}
                            player={props.playerNum}
                        ></BonusButton>
                    ))
                }
            </div>
        </div>
    );
}

export default Sideframe;