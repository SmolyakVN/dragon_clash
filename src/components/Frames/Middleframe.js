import React, { useState } from 'react';
import classes from "./Middleframe.module.css";
import Cell from "../Cell/Cell.js";
import PreparationCell from "../Cell/PreparationCell.js";
import Description from './Description.js';

function Middleframe(props) {
    const [opacityButtonsBlock, setOpacityButtonsBlock] = useState('0');

    function newGameButtonHandle(){
        newRoundButtonHandle();
        props.setPlayersScore({'1': 0, '2': 0});
        props.setCurrentPlayer(1);
        props.setRoundsCounter(1);
    }

    function newRoundButtonHandle(){
        props.setBonusesPoints(props.bonusesPointsDefault);
        props.setRoundIsFinished(false);
        props.setShowButtons(false);
        props.setCellsFirstPlayer(shuffleList(props.cellListFirstPlayer));
        props.setCellsSecondPlayer(shuffleList(props.cellListSecondPlayer));
        props.setFirstPlayerIsReady(false);
        props.setSecondPlayerIsReady(false);
        props.setActivatedBonuses([]);
        props.setUsedBonuses([]);
        props.setNotUsedBonusesList([]);
        props.setGettingBonusesList([]);
        props.setRoundsCounter(props.roundsCounter + 1);
    }

    function opacityElementEnter(e){
        e.currentTarget.parentElement.querySelector(`.${classes["opacity-div"]}`).style.opacity = 1;
    }

    function opacityElementLeave(e){
        e.currentTarget.parentElement.querySelector(`.${classes["opacity-div"]}`).style.opacity = 0;
    }

    function nextPlayerContinueHandle(){
        if (!props.firstPlayerIsReady){
            props.setFirstPlayerIsReady(true);
        } else {
            props.setSecondPlayerIsReady(true);
        }
        props.setShowCards(false);
    }

    function nextPlayerSkipHandle(){
        if (!props.firstPlayerIsReady){
            props.setPlayersScore(prevScores => ({
            ...prevScores,
            ['1']: props.playersScore['1'] + 10
            }));
            props.setFirstPlayerIsReady(true);
        } else {
            props.setPlayersScore(prevScores => ({
            ...prevScores,
            ['2']: props.playersScore['2'] + 10
            }));
            props.setSecondPlayerIsReady(true);
        }
        props.setShowCards(false);
    }

    function playerNameInputFocusHandle(e){
        props.setPlayerNameInputSelected(true);
        opacityElementLeave(e);
    }

    function playerNameInputBlurHandle(){
        props.setPlayerNameInputSelected(false);
    }

    function playerNameInputChangeHandle(e){
        !props.firstPlayerIsReady ? props.setFirstPlayerName(e.currentTarget.value) : props.setSecondPlayerName(e.currentTarget.value);
    }

    function playerNameInputHoverHandle(e){
        if (!props.playerNameInputSelected) {
            opacityElementEnter(e);
        }
    }

    function shuffleList(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    if (props.showButtons){
        setTimeout(() => {
            setOpacityButtonsBlock('1');
        }, 500);
    }

    return (
        props.mode === 'game' ? (
            <div className={classes["middleframe-div"]}>
                <div className={classes["middleframe-main-div"]}>
                    <div className={`${classes["middleframe-information"]} ${classes["round"]}`}>
                        Раунд {props.roundsCounter}
                    </div>
                    {!props.roundIsFinished ? 
                        <div className={classes["middleframe-containers-div"]}>
                            <div className={classes["container"]}>
                                {props.cellsFirstPlayer.map((item, i) => (
                                    <Cell
                                        {...props.cellProps}
                                        active={props.activeCards.includes(item.index)}
                                        display={item.display}
                                        value={item.value}
                                        key={i}
                                        id={i}
                                        index={item.index}
                                        type={item.type}
                                        cells={props.cellsFirstPlayer}
                                        setCells={props.setCellsFirstPlayer}
                                    ></Cell>
                                ))}
                            </div>
                            <div className={classes["container-separator"]}></div>
                            <div className={classes["container"]}>
                                {props.cellsSecondPlayer.map((item, i) => (
                                    <Cell
                                        {...props.cellProps}
                                        active={props.activeCards.includes(item.index)}
                                        display={item.display}
                                        value={item.value}
                                        key={i}
                                        id={i}
                                        index={item.index}
                                        type={item.type}
                                        cells={props.cellsSecondPlayer}
                                        setCells={props.setCellsSecondPlayer}
                                    ></Cell>
                                ))}
                            </div>
                        </div>
                    : ( 
                        <div className={classes["newround-buttons-group"]} style={{'opacity': opacityButtonsBlock}}>
                            {props.showButtons ? (
                                <>
                                    <button onClick={newRoundButtonHandle}>продолжить</button>
                                    <button onClick={newGameButtonHandle}>новая игра</button>
                                </>
                            ) : ('')}
                        </div>
                    )}
                    <Description
                        description={props.description}
                        additionalDescription={props.additionalDescription}
                        showDescription={props.showDescription}
                    ></Description>
                </div>
            </div>
        ) : (
            <div className="mainframe preparation">
                <div className={classes["player-name-group"]}>
                    <div className={`${classes["player-name-input-label"]} ${classes["opacity-div"]}`}>нажмите для редактирования</div>
                    <input 
                        className={classes["preparation-player-name"]} 
                        onChange={playerNameInputChangeHandle} 
                        onMouseEnter={playerNameInputHoverHandle} 
                        onMouseLeave={opacityElementLeave}
                        onFocus={playerNameInputFocusHandle} 
                        onBlur={playerNameInputBlurHandle}
                        value={!props.firstPlayerIsReady ? props.firstPlayerName : props.secondPlayerName}
                    />
                    <div className={classes["preparation-information"]}>вы можете просмотреть и изменить расположение карт, либо пропустить этот шаг</div>
                </div>
                {props.showCards ? <button onClick={nextPlayerContinueHandle}>продолжить</button> : (
                <div className={classes["preparation-buttons-div"]}>
                    <button onClick={() => props.setShowCards(true)}>посмотреть</button>
                    <div className={classes["preparation-buttons-group"]}>
                    <button onClick={nextPlayerSkipHandle} onMouseEnter={opacityElementEnter} onMouseLeave={opacityElementLeave}>пропустить</button>
                    <div className={`${classes["preparation-buttons-group-label"]} ${classes["opacity-div"]}`}>+10 очков</div>
                    </div>
                </div>
                )}
                <div className={`${classes["container"]} ${classes["preparation"]}`}>
                {!props.firstPlayerIsReady ? (
                    props.cellsFirstPlayer.map((item, i) => (
                    <PreparationCell
                        {...props.cellPreparationProps}
                        value={item.value}
                        key={i}
                        id={i}
                        index={item.index}
                        type={item.type}
                        cells={props.cellsFirstPlayer}
                        setCells={props.setCellsFirstPlayer}
                    ></PreparationCell>
                    ))
                ) : (
                    props.cellsSecondPlayer.map((item, i) => (
                    <PreparationCell
                        {...props.cellPreparationProps}
                        value={item.value}
                        key={i}
                        id={i}
                        index={item.index}
                        type={item.type}
                        cells={props.cellsSecondPlayer}
                        setCells={props.setCellsSecondPlayer}
                    ></PreparationCell>
                    ))
                )}
                </div>
                <Description
                    description={props.description}
                    additionalDescription={props.additionalDescription}
                    showDescription={props.showDescription}
                ></Description>
            </div>
        )
    );
}

export default Middleframe;