import React, { useState } from 'react';
import classes from "./Middleframe.module.css";
import Cell from "../Cell/Cell.js";
import PreparationCell from "../Cell/PreparationCell.js";
import Description from './Description.js';
import { useAppContext } from '../../AppProvider.jsx';

function Middleframe(props) {
    const [opacityButtonsBlock, setOpacityButtonsBlock] = useState('0');
    const {
        playersScore, setPlayersScore,
        setCurrentPlayer,
        roundsCounter, setRoundsCounter,
        setBonusesPoints,
        roundIsFinished, setRoundIsFinished,
        showButtons, setShowButtons,
        cellsFirstPlayer, setCellsFirstPlayer, 
        cellsSecondPlayer, setCellsSecondPlayer,
        cellListFirstPlayer, cellListSecondPlayer,
        firstPlayerIsReady, setFirstPlayerIsReady, 
        setSecondPlayerIsReady,
        setActivatedBonuses,
        setUsedBonuses, 
        setNotUsedBonusesList,
        setGettingBonusesList,
        bonusesPointsDefault,
        showCards, setShowCards,
        playerNameInputSelected, setPlayerNameInputSelected,
        firstPlayerName, setFirstPlayerName, 
        secondPlayerName, setSecondPlayerName,
        description,
        showDescription,
        additionalDescription,
        activeCards
    } = useAppContext();

    function newGameButtonHandle(){
        newRoundButtonHandle();
        setPlayersScore({'1': 0, '2': 0});
        setCurrentPlayer(1);
        setRoundsCounter(1);
    }

    function newRoundButtonHandle(){
        setBonusesPoints(bonusesPointsDefault);
        setRoundIsFinished(false);
        setShowButtons(false);
        setCellsFirstPlayer(shuffleList(cellListFirstPlayer));
        setCellsSecondPlayer(shuffleList(cellListSecondPlayer));
        setFirstPlayerIsReady(false);
        setSecondPlayerIsReady(false);
        setActivatedBonuses([]);
        setUsedBonuses([]);
        setNotUsedBonusesList([]);
        setGettingBonusesList([]);
        setRoundsCounter(roundsCounter + 1);
    }

    function opacityElementEnter(e){
        e.currentTarget.parentElement.querySelector(`.${classes["opacity-div"]}`).style.opacity = 1;
    }

    function opacityElementLeave(e){
        e.currentTarget.parentElement.querySelector(`.${classes["opacity-div"]}`).style.opacity = 0;
    }

    function nextPlayerContinueHandle(){
        if (!firstPlayerIsReady){
            setFirstPlayerIsReady(true);
        } else {
            setSecondPlayerIsReady(true);
        }
        setShowCards(false);
    }

    function nextPlayerSkipHandle(){
        if (!firstPlayerIsReady){
            setPlayersScore(prevScores => ({
            ...prevScores,
            ['1']: playersScore['1'] + 10
            }));
            setFirstPlayerIsReady(true);
        } else {
            setPlayersScore(prevScores => ({
            ...prevScores,
            ['2']: playersScore['2'] + 10
            }));
            setSecondPlayerIsReady(true);
        }
        setShowCards(false);
    }

    function playerNameInputFocusHandle(e){
        setPlayerNameInputSelected(true);
        opacityElementLeave(e);
    }

    function playerNameInputBlurHandle(){
        setPlayerNameInputSelected(false);
    }

    function playerNameInputChangeHandle(e){
        !firstPlayerIsReady ? setFirstPlayerName(e.currentTarget.value) : setSecondPlayerName(e.currentTarget.value);
    }

    function playerNameInputHoverHandle(e){
        if (!playerNameInputSelected) {
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

    if (showButtons){
        setTimeout(() => {
            setOpacityButtonsBlock('1');
        }, 500);
    }

    return (
        props.mode === 'game' ? (
            <div className={classes["middleframe-div"]}>
                <div className={classes["middleframe-main-div"]}>
                    <div className={`${classes["middleframe-information"]} ${classes["round"]}`}>
                        Раунд {roundsCounter}
                    </div>
                    {!roundIsFinished ? 
                        <div className={classes["middleframe-containers-div"]}>
                            <div className={classes["container"]}>
                                {cellsFirstPlayer.map((item, i) => (
                                    <Cell
                                        {...props.cellProps}
                                        active={activeCards.includes(item.index)}
                                        display={item.display}
                                        value={item.value}
                                        key={i}
                                        id={i}
                                        index={item.index}
                                        type={item.type}
                                        cells={cellsFirstPlayer}
                                        setCells={setCellsFirstPlayer}
                                    ></Cell>
                                ))}
                            </div>
                            <div className={classes["container-separator"]}></div>
                            <div className={classes["container"]}>
                                {cellsSecondPlayer.map((item, i) => (
                                    <Cell
                                        {...props.cellProps}
                                        active={activeCards.includes(item.index)}
                                        display={item.display}
                                        value={item.value}
                                        key={i}
                                        id={i}
                                        index={item.index}
                                        type={item.type}
                                        cells={cellsSecondPlayer}
                                        setCells={setCellsSecondPlayer}
                                    ></Cell>
                                ))}
                            </div>
                        </div>
                    : ( 
                        <div className={classes["newround-buttons-group"]} style={{'opacity': opacityButtonsBlock}}>
                            {showButtons ? (
                                <>
                                    <button onClick={newRoundButtonHandle}>продолжить</button>
                                    <button onClick={newGameButtonHandle}>новая игра</button>
                                </>
                            ) : ('')}
                        </div>
                    )}
                    <Description
                        description={description}
                        additionalDescription={additionalDescription}
                        showDescription={showDescription}
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
                        value={!firstPlayerIsReady ? firstPlayerName : secondPlayerName}
                    />
                    <div className={classes["preparation-information"]}>вы можете просмотреть и изменить расположение карт, либо пропустить этот шаг</div>
                </div>
                {showCards ? <button onClick={nextPlayerContinueHandle}>продолжить</button> : (
                <div className={classes["preparation-buttons-div"]}>
                    <button onClick={() => setShowCards(true)}>посмотреть</button>
                    <div className={classes["preparation-buttons-group"]}>
                    <button onClick={nextPlayerSkipHandle} onMouseEnter={opacityElementEnter} onMouseLeave={opacityElementLeave}>пропустить</button>
                    <div className={`${classes["preparation-buttons-group-label"]} ${classes["opacity-div"]}`}>+10 очков</div>
                    </div>
                </div>
                )}
                <div className={`${classes["container"]} ${classes["preparation"]}`}>
                {!firstPlayerIsReady ? (
                    cellsFirstPlayer.map((item, i) => (
                    <PreparationCell
                        value={item.value}
                        key={i}
                        id={i}
                        index={item.index}
                        type={item.type}
                        cells={cellsFirstPlayer}
                        setCells={setCellsFirstPlayer}
                    ></PreparationCell>
                    ))
                ) : (
                    cellsSecondPlayer.map((item, i) => (
                    <PreparationCell
                        value={item.value}
                        key={i}
                        id={i}
                        index={item.index}
                        type={item.type}
                        cells={cellsSecondPlayer}
                        setCells={setCellsSecondPlayer}
                    ></PreparationCell>
                    ))
                )}
                </div>
                <Description
                    description={description}
                    additionalDescription={additionalDescription}
                    showDescription={showDescription}
                ></Description>
            </div>
        )
    );
}

export default Middleframe;