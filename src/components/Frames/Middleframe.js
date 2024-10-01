import React, { useState, useEffect } from 'react';
import classes from "./Middleframe.module.css";
import Cell from "../Cell/Cell.js";
import PreparationCell from "../Cell/PreparationCell.js";
import Description from './Description.js';
import BonusButton from '../Buttons/BonusButton.js';
import classesSideframe from "./Sideframe.module.css";
import { useAppContext } from '../../AppProvider.jsx';

function Middleframe(props) {
    const [opacityButtonsBlock, setOpacityButtonsBlock] = useState('0');
    const [opacityPreparationBlock, setOpacityPreparationBlock] = useState(false);
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
        secondPlayerIsReady, setSecondPlayerIsReady,
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
        activeCards,
        bonuses,
        setAppBackground,
        setBackgroundShadowOpacity,
        setOpacityMainframeBlock
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
        setOpacityPreparationBlock(false);
        backgroundSetter('greens');
        setOpacityMainframeBlock('0');
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
            backgroundSetter('blacks');
        } else {
            setSecondPlayerIsReady(true);
            backgroundSetter('');
        }
        setShowCards(false);
        setOpacityPreparationBlock(false);
    }

    function nextPlayerSkipHandle(){
        if (!firstPlayerIsReady){
            setPlayersScore(prevScores => ({
            ...prevScores,
            ['1']: playersScore['1'] + 10
            }));
            setFirstPlayerIsReady(true);
            backgroundSetter('blacks');
        } else {
            setPlayersScore(prevScores => ({
            ...prevScores,
            ['2']: playersScore['2'] + 10
            }));
            setSecondPlayerIsReady(true);
            backgroundSetter('');
        }
        setShowCards(false);
        setOpacityPreparationBlock(false);
    }

    function backgroundSetter(background){
        setTimeout(() => {
            setAppBackground(background);
        }, 0);
    }

    function playerNameInputFocusHandle(e){
        setPlayerNameInputSelected(true);
        opacityElementLeave(e);
    }

    function playerNameInputBlurHandle(){
        setPlayerNameInputSelected(false);
        if (firstPlayerName === ''){
            setFirstPlayerName('Игрок 1');
        }
        if (secondPlayerName === ''){
            setSecondPlayerName('Игрок 2');
        }
    }

    function playerNameInputChangeHandle(e){
        let playerName = e.currentTarget.value;
        !firstPlayerIsReady ? setFirstPlayerName(playerName) : setSecondPlayerName(playerName);
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

    // if (showButtons){
    //     setTimeout(() => {
    //         setOpacityButtonsBlock('1');
    //     }, 500);
    // }

    useEffect(() => {
        setBackgroundShadowOpacity('0');
        setTimeout(() => {
            setOpacityPreparationBlock(true);
            setBackgroundShadowOpacity('1');
            if (secondPlayerIsReady){
                setOpacityMainframeBlock('1');
            }
        }, 2000);
    }, [firstPlayerIsReady, secondPlayerIsReady]);

    return (
        props.mode === 'game' ? (
            <div className={classes["middleframe-div"]}>
                <div className={classes["middleframe-main-div"]}>
                    <div className={`${classes["middleframe-information"]} ${classes["round"]}`}>
                        Раунд {roundsCounter}
                    </div>
                    <div className={classes["board-div"]}>
                        <div className={classes['bonus-buttons-div']}>
                            {
                                bonuses['1'].map((item, i) => (
                                    <BonusButton
                                        key={i}
                                        bonus={item.bonus}
                                        icon={item.icon}
                                        description={item.description}
                                        additionalDescription={item.additionalDescription}
                                        player={1}
                                    ></BonusButton>
                                ))
                            }
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
                                            img={item.img}
                                            icon={item.icon}
                                            cells={cellsFirstPlayer}
                                            setCells={setCellsFirstPlayer}
                                            name={item.name}
                                            description={item.description}
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
                                            img={item.img}
                                            icon={item.icon}
                                            cells={cellsSecondPlayer}
                                            setCells={setCellsSecondPlayer}
                                            name={item.name}
                                            description={item.description}
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
                        <div className={classes['bonus-buttons-div']}>
                            {
                                bonuses['2'].map((item, i) => (
                                    <BonusButton
                                        key={i}
                                        bonus={item.bonus}
                                        icon={item.icon}
                                        description={item.description}
                                        additionalDescription={item.additionalDescription}
                                        player={2}
                                    ></BonusButton>
                                ))
                            }
                        </div>
                    </div>
                    <Description
                        description={description}
                        additionalDescription={additionalDescription}
                        showDescription={showDescription}
                        mode="battle"
                    ></Description>
                </div>
            </div>
        ) : (
            <div className="mainframe preparation" style={{'opacity': opacityPreparationBlock ? 1 : 0, 'transition': `opacity ${opacityPreparationBlock ? '0.5' : '0'}s`}}>
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
                    <div className={classes["preparation-information"]}>
                        {!showCards ? 'вы можете просмотреть и изменить расположение карт, либо пропустить этот шаг' : 'вы можете изменить расположение карт'}
                    </div>
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
                        img={item.img}
                        icon={item.icon}
                        cells={cellsFirstPlayer}
                        setCells={setCellsFirstPlayer}
                        name={item.name}
                        description={item.description}
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
                        img={item.img}
                        icon={item.icon}
                        cells={cellsSecondPlayer}
                        setCells={setCellsSecondPlayer}
                        name={item.name}
                        description={item.description}
                    ></PreparationCell>
                    ))
                )}
                </div>
                <Description
                    description={description}
                    additionalDescription={additionalDescription}
                    showDescription={showDescription}
                    mode="preparation"
                ></Description>
            </div>
        )
    );
}

export default Middleframe;