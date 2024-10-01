import React from 'react';
import Stack from "../Stack/Stack.js";
import classes from "./Sideframe.module.css";
import { useAppContext } from '../../AppProvider.jsx';

function Sideframe(props) {
    const stackProps = {
        playerNum: props.playerNum,
        cells: props.cells
    }

    const {playersScore, currentPlayer} = useAppContext();

    return (
        <div className={classes['sideframe']} style={props.playerNum === 2 ? {'flexDirection': 'row-reverse'} : null}>
            <div className={classes['sideframe-main']}>
                <div className={classes['stacks-div']} data-player={props.playerNum}>
                    <Stack
                        {...stackProps}
                        type="losses"
                    ></Stack>
                    <Stack
                        {...stackProps}
                        type="wins"
                    ></Stack>
                </div>
                <div className={classes['player-score-div']}>
                    <div className={`${classes['player-score']} ${props.playerNum === 1 ? classes['greens'] : classes['blacks']}`} data-player={props.playerNum}>{playersScore[props.playerNum]}</div>
                    <div className={classes['player-name-div']}>
                        <div className={`${classes['player-name']} ${props.playerNum === 1 ? classes['greens'] : classes['blacks']}`} title={props.playerName}>{props.playerName}</div>
                        <div data-player={props.playerNum} className={`${classes['player-underline']} ${props.playerNum === currentPlayer ? classes['active'] : ''}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sideframe;