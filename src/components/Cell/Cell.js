import React, { useState, useEffect, useRef } from 'react';
import classes from "./Cell.module.css";
import classesSidebar from "../Frames/Sideframe.module.css";
import { useAppContext } from '../../AppProvider';

function Cell(props) {
  const cellRef = useRef(null);
  const {
    spyActive, setSpyActive,
    openedCardsCount, setOpenedCardsCount,
    currentPlayer,
    openedCards, setOpenedCards,
    setActive,
    activatedBonuses, setActivatedBonuses,
    setUsedBonuses,
    setDescription,
    setAdditionalDescription,
    setShowDescription,
    usedBonuses,
    setCurrentPlayer,
    playersScore, setPlayersScore,
    setCellsFirstPlayer, 
    setCellsSecondPlayer
  } = useAppContext();

  useEffect(() => {
    const updateWidth = () => {
      if (cellRef.current) {
        // setCellWidth(cellRef.current.offsetWidth);
        console.log(cellRef.current.offsetWidth)
        document.documentElement.style.setProperty('--card-width', `${cellRef.current.offsetWidth}px`);
      }
    };
    
    updateWidth();
    
    window.addEventListener('resize', updateWidth);
    
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const handleClick = (e) => {
    let counter = openedCardsCount;
    let clickable = false;
    if (e.currentTarget.getAttribute("data-active") === 'false' && counter < 2){
      clickable = true;
      if (spyActive && counter > 0){
        clickable = false;
      }
      if (counter === 1){
        if (openedCards[0].type === props.type && props.type !== currentPlayer){
          clickable = false;
        }
      }
    }
    if (clickable) {
        showDescription();
        // const openedCards = openedCards;
        openedCards[counter].type = props.type;
        openedCards[counter].value = props.value;
        openedCards[counter].index = props.index;
        setOpenedCards(openedCards);
        counter++;
        if (counter <= 2){
          setActive(prevActiveCards => [...prevActiveCards, props.index]);
          setOpenedCardsCount(counter);
          e.currentTarget.querySelector(`.${classes['cell-front']}`).classList.add(classes['cell-front-reverse']);
          e.currentTarget.querySelector(`.${classes['cell-back']}`).classList.add(classes['cell-back-reverse']);
          if (counter === 2){
            setTimeout(() => {
              let enemyPlayer = currentPlayer === 1 ? 2 : 1;
              let currentPlayerCard = openedCards.find(i => i.type === currentPlayer);
              let enemyPlayerCard = openedCards.find(i => i.type === enemyPlayer);
              let currentPlayerCardValue = currentPlayerCard ? currentPlayerCard.value : 0;
              let enemyPlayerCardValue = 0;
              if (openedCards[0].type !== openedCards[1].type){
                enemyPlayerCardValue = enemyPlayerCard.value;
              }
              let playerChange = false;
              let shieldSaves = false;
              if (activatedBonuses.findIndex(i => i.bonus === 'attack') > -1){
                currentPlayerCardValue *= 2;
              }
              if (activatedBonuses.findIndex(i => i.bonus === 'guard') > -1){
                if (currentPlayerCardValue < enemyPlayerCardValue){
                  shieldSaves = true;
                }
              }
              if (openedCards[0].type === openedCards[1].type || shieldSaves){
                document.querySelectorAll(`.${classes['cell']}`).forEach(cell => {
                  cell.classList.remove(classes['cell-front-reverse'], classes['cell-back-reverse']);
                });
                playerChange = true;
              } else {
                const newDataFirstCard = { index: 0, display: false, player: currentPlayer, win: false };
                const newDataSecondCard = { index: 0, display: false };
                const currentScore = playersScore[currentPlayer];
                let scoreChange = currentPlayerCardValue >= enemyPlayerCardValue ? enemyPlayerCardValue : -currentPlayerCardValue;
                if (activatedBonuses.findIndex(i => i.bonus === 'x2') > -1){
                  scoreChange *= 2;
                }
                const newScore = Math.max(0, currentScore + scoreChange);
                newDataFirstCard.player = currentPlayer;
                let scoreResult = 'add';
                if (currentPlayerCardValue >= enemyPlayerCardValue){
                  newDataFirstCard.win = true;
                  newDataFirstCard.index = enemyPlayerCard.index;
                  newDataSecondCard.index = currentPlayerCard.index;
                } else {
                  newDataFirstCard.index = currentPlayerCard.index;
                  newDataSecondCard.index = enemyPlayerCard.index;
                  playerChange = true;
                  scoreResult = 'subtract';
                }
                document.querySelector(`.${classesSidebar['player-score']}[data-player="${currentPlayer}"]`).classList.add(classesSidebar[scoreResult]);
                setPlayersScore(prevScores => ({
                  ...prevScores,
                  [currentPlayer]: newScore
                }));
                setCellsFirstPlayer(prevCells => 
                  prevCells.map(cell =>
                    cell.index === newDataFirstCard.index
                    ? { ...cell, ...newDataFirstCard }
                    : cell.index === newDataSecondCard.index
                    ? { ...cell, ...newDataSecondCard }
                    : cell
                  )
                );
                setCellsSecondPlayer(prevCells => 
                  prevCells.map(cell =>
                    cell.index === newDataFirstCard.index
                    ? { ...cell, ...newDataFirstCard }
                    : cell.index === newDataSecondCard.index
                    ? { ...cell, ...newDataSecondCard }
                    : cell
                  )
                );
              }
              let activatedBonusesArray = activatedBonuses;
              if (playerChange){
                setCurrentPlayer(enemyPlayer);
                activatedBonusesArray = [];
                if (shieldSaves){
                  activatedBonusesArray.push({'bonus': 'guard', 'player': currentPlayer});
                }
              }
              let usedBonusesArray = usedBonuses.filter(item => {
                if (item.bonus === 'change') {
                  return false;
                } else {
                  return true;
                }
              });
              usedBonusesArray.push(...activatedBonusesArray);
              setUsedBonuses([...usedBonusesArray]);
            }, 2000);
          } else if (counter === 1 && spyActive){
            setTimeout(() => {
              setUsedBonuses(prevUsedBonuses => [...prevUsedBonuses, {'bonus': 'spy', 'player': currentPlayer}]);
              setSpyActive(false);
              document.querySelectorAll(`.${classes['cell']}`).forEach(cell => {
                cell.classList.remove(classes['cell-front-reverse'], classes['cell-back-reverse']);
              });
            }, 2000);
          }
          if (counter === 2 || (counter === 1 && spyActive)){
            setTimeout(() => {
              setActivatedBonuses([]);
              setActive([]);
              setOpenedCardsCount(0);
              setOpenedCards([{'type': 0, 'value': 0, 'index': 0 }, {'type': 0, 'value': 0, 'index': 0 }]);
              setTimeout(() => {
                document.querySelector(`.${classesSidebar['player-score']}[data-player="${currentPlayer}"]`).classList.remove(classesSidebar['add'], classesSidebar['subtract']);
              }, 500);
              hideDescription();
            }, 2000);
          }
        }
      }
  };

  function showDescription() {
    setShowDescription(true);
    setDescription(props.value);
    setAdditionalDescription('');
  }

  function hideDescription() {
    setShowDescription(false);
  }
  
  return (
    props.display ? (
      <div
        className={`${classes['cell-div']}`}
        ref={cellRef}
        data-type={props.type}
        data-active={props.active}
        onClick={handleClick}
        data-value={props.value}
      >
        <div
          className={`${classes.cell} ${classes['cell-back']}`}
        >{props.value}</div>
        <div
          className={`${classes.cell} ${classes['cell-front']}`}
          onMouseEnter={showDescription}
          onMouseLeave={hideDescription}
        >
          {props.value}
        </div>
      </div>
    ) : (
      <div className={`${classes['cell-div']}`}></div>
    )
  );
}

export default Cell;
