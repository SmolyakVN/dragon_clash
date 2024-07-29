import {React, createContext, useContext, useState, useEffect} from 'react';
import classesSideframe from './components/Frames/Sideframe.module.css';

const AppContext = createContext();

const useAppContext = () => useContext(AppContext);

const cardsPower = [1, 2, 3, 4, 5, 6, 7, 8];

let cellListFirstPlayer = [];
let cellListSecondPlayer = [];

const fillList = () => {
  let index = 0;
  let list = cellListFirstPlayer;
  for (let i = 1; i <= 2; i++) {
    for (let j = 0; j < cardsPower.length; j++) {
      if (i === 2) {
        list = cellListSecondPlayer;
      }
      list.push({
        index: index,
        type: i,
        value: cardsPower[j],
        display: true,
        player: 0,
        win: false,
      });
      index++;
    }
  }
}
fillList();

const shuffleList = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
cellListFirstPlayer = shuffleList(cellListFirstPlayer);
cellListSecondPlayer = shuffleList(cellListSecondPlayer);

const AppProvider = (({children}) => {
    const bonuses = [
        {bonus: 'attack', icon: 'sword', description: 'bonus attack'},
        {bonus: 'guard', icon: 'shield', description: 'bonus guard'},
        {bonus: 'spy', icon: 'spyglass', description: 'bonus spy'},
        {bonus: 'x2', icon: 'x2', description: 'bonus x2'},
        {bonus: 'change', icon: 'change', description: 'bonus change'},
    ];
    
    const bonusesPointsDefault = {
        attack: {1: 0, 2: 0},
        guard: {1: 0, 2: 0},
        spy: {1: 0, 2: 0},
        x2: {1: 0, 2: 0}
    };
    
    const [cellsFirstPlayer, setCellsFirstPlayer] = useState(cellListFirstPlayer);
    const [cellsSecondPlayer, setCellsSecondPlayer] = useState(cellListSecondPlayer);
    const [active, setActive] = useState([]);
    const [openedCardsCount, setOpenedCardsCount] = useState(0);
    const [openedCards, setOpenedCards] = useState([
        {type: 0, value: 0, index: 0},
        {type: 0, value: 0, index: 0}
    ]);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [playersScore, setPlayersScore] = useState({1: 0, 2: 0});
    const [dragging, setDragging] = useState(null);
    const [firstPlayerIsReady, setFirstPlayerIsReady] = useState(false);
    const [secondPlayerIsReady, setSecondPlayerIsReady] = useState(false);
    const [firstPlayerName, setFirstPlayerName] = useState('Игрок 1');
    const [secondPlayerName, setSecondPlayerName] = useState('Игрок 2');
    const [showCards, setShowCards] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [playerNameInputSelected, setPlayerNameInputSelected] = useState(false);
    const [roundIsFinished, setRoundIsFinished] = useState(false);
    const [activatedBonuses, setActivatedBonuses] = useState([]);
    const [usedBonuses, setUsedBonuses] = useState([]);
    const [notUsedBonuses, setNotUsedBonuses] = useState([]);
    const [spyActive, setSpyActive] = useState(false);
    const [description, setDescription] = useState('');
    const [additionalDescription, setAdditionalDescription] = useState('');
    const [showDescription, setShowDescription] = useState(false);
    const [roundsCounter, setRoundsCounter] = useState(1);
    const [bonusesPoints, setBonusesPoints] = useState(bonusesPointsDefault);
    const [notUsedBonusesList, setNotUsedBonusesList] = useState([]);
    const [gettingBonusesList, setGettingBonusesList] = useState([]);
      
    const value = {
        activeCards: active, setActive,
        openedCardsCount, setOpenedCardsCount,
        openedCards, setOpenedCards,
        currentPlayer, setCurrentPlayer,
        playersScore, setPlayersScore,
        cellsFirstPlayer, setCellsFirstPlayer,
        cellsSecondPlayer, setCellsSecondPlayer,
        activatedBonuses, setActivatedBonuses,
        usedBonuses, setUsedBonuses,
        spyActive, setSpyActive,
        cellListFirstPlayer,
        cellListSecondPlayer,
        roundIsFinished, setRoundIsFinished,
        firstPlayerIsReady, setFirstPlayerIsReady,
        secondPlayerIsReady, setSecondPlayerIsReady,
        description, setDescription,
        additionalDescription, setAdditionalDescription,
        showDescription, setShowDescription,
        roundsCounter, setRoundsCounter,
        showButtons, setShowButtons,
        bonusesPoints, setBonusesPoints,
        bonusesPointsDefault,
        setNotUsedBonusesList,
        gettingBonusesList, setGettingBonusesList,
        dragging, setDragging,
        playerNameInputSelected, setPlayerNameInputSelected,
        showCards, setShowCards,
        firstPlayerName, setFirstPlayerName,
        secondPlayerName, setSecondPlayerName,
        bonuses,
        notUsedBonuses        
    }

    const checkNotUsedBonuses = () => {
        let newNotUsedBonuses = [...notUsedBonuses];
        bonuses.forEach((item, index) => {
          if (item.bonus !== 'change') {
            for (let i = 1; i <= 2; i++) {
              let findUsedBonus = usedBonuses.find(
                (usedBonus) => 
                    usedBonus.bonus === item.bonus &&
                    usedBonus.player === i
              );
              let findedIndex = newNotUsedBonuses.findIndex(
                (notUsedBonus) =>
                  notUsedBonus.bonus === item.bonus &&
                  notUsedBonus.player === i
              );
              if (!findUsedBonus) {
                if (findedIndex > -1) {
                  newNotUsedBonuses[findedIndex].count += 1;
                } else {
                  newNotUsedBonuses.push({
                    index: index,
                    bonus: item.bonus,
                    player: i,
                    count: 1
                  });
                }
              } else {
                if (findedIndex > -1) {
                  newNotUsedBonuses.splice(findedIndex, 1);
                }
              }
            }
          }
        });
        setNotUsedBonuses(newNotUsedBonuses);
    };
    
    const addScore = (player) => {
        document.querySelector(`.${classesSideframe['player-score']}[data-player="${player}"]`).classList.add(classesSideframe['add']);
        setTimeout(() => {
          document.querySelector(`.${classesSideframe['player-score']}[data-player="${player}"]`).classList.remove(classesSideframe['add']);
        }, 500);
    };
    
    useEffect(() => {
        if (cellsFirstPlayer.filter((item) => item.display).length === 4) {
          setTimeout(() => {
            setRoundIsFinished(true);
            checkNotUsedBonuses();
          }, 2000);
        }
    }, [cellsFirstPlayer]);
    
    useEffect(() => {
        let updatedPoints = {...bonusesPoints};
        notUsedBonuses.forEach((i) => {
          updatedPoints[i.bonus][i.player] = i.count;
        });
        setBonusesPoints(updatedPoints);
    }, [notUsedBonuses]);
    
    useEffect(() => {
        let newBonusesList = [];
        for (const key in bonusesPoints) {
          if (bonusesPoints[key][1] > 0 || bonusesPoints[key][2] > 0) {
            newBonusesList.push(key);
          }
        }
        setNotUsedBonusesList(newBonusesList);
    }, [bonusesPoints]);
    
    useEffect(() => {
        let timeout = Math.max(0, notUsedBonusesList.length * 2000 - 500);
        setTimeout(() => {
          const delay = (ms) =>
            new Promise((resolve) => setTimeout(resolve, ms));
          const iterateList = async (list) => {
            for (const item of list) {
              setGettingBonusesList((prevList) => [...prevList, item]);
              for (let player = 1; player <= 2; player++) {
                if (bonusesPoints[item][player] > 0) {
                  setPlayersScore((prevScores) => {
                    const newScore = prevScores[player] + bonusesPoints[item][player];
                    addScore(player);
                    return {
                        ...prevScores,
                        [player]: newScore,
                    };
                  });
                }
              }
              await delay(2000);
            }
          };
          iterateList(notUsedBonusesList);
          if (roundIsFinished) {
            setTimeout(() => {
              setShowButtons(true);
            }, timeout);
          }
        }, 2000);
    }, [notUsedBonusesList]);

    return (
        <AppContext.Provider
            value={value}>
            {children}
        </AppContext.Provider>
    )
});

export {AppProvider, useAppContext};