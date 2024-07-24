import React, { useEffect, useState } from 'react';
import classes from "./components/Cell/Cell.module.css";
import './App.css';
import AuthForm from './components/AuthForm/AuthForm.js';
import Cell from "./components/Cell/Cell.js";

let cardsPower = [1, 2, 3, 4, 5, 6, 7, 8];

let mode = 'fight';
// let mode = 'battle';

if (mode === 'battle'){
  cardsPower = [1, 1, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8];
}

let cellBlockBigList = [];
function fillList() {
  let index = 0;
  for (let i = 1; i <= 2; i++) {
    for (let j = 0; j < cardsPower.length; j++) {
      cellBlockBigList.push({ index: index, type: i, value: cardsPower[j], display: true, player: 0, win: false});
      // if (index === 11){
      //   index++;
      //   cellBlockBigList.push({ index: index, type: 0, value: 0, display: false, player: 0, win: false});
      // }
      index++;
    }
  }
}
fillList();
function shuffleList(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
cellBlockBigList = shuffleList(cellBlockBigList);

function App() {
  const [cells, setCells] = useState(cellBlockBigList);
  const [active, setActive] = useState([]);
  const [openedCardsCount, setOpenedCardsCount] = useState(0);
  const [openedCards, setOpenedCards] = useState([{'type': 0, 'value': 0, 'index': 0}, {'type': 0, 'value': 0, 'index': 0}]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playersScore, setPlayersScore] = useState({'1': 0, '2': 0});

  useEffect(() => {
    const cellWidth = document.querySelector(`.${classes['cell']}`).offsetWidth;
    document.documentElement.style.setProperty('--card-width', `${cellWidth}px`);
  }, []);

  const renderWithCounter = (filterFn) => {
    let count = 0;
    return cells.map((item, i) => 
      filterFn(item) ? (
        <div key={i} className="card" data-type={item.type} style={{ bottom: `${++count * 0.8}rem` }}>
          <div className="card-body">
            <div className="card-value">{item.value}</div>
            <div className="card-label">{item.value}</div>
          </div>
        </div>
      ) : null
    );
  }

  // localStorage.setItem('userId', '');
  return (
    <div className="App">
      {localStorage.getItem('userId') === '' ? <AuthForm /> : 
        <div className="mainframe">
          <div className="sideframe">
            <div className="sideframe-cards-container losses">
              <div className="cards-stack">
                {renderWithCounter(item => item.player === 1 && !item.win)}
              </div>
              <div>потери</div>
            </div>
            <div className="sideframe-cards-container wins">
              <div className="cards-stack">
                {renderWithCounter(item => item.player === 1 && item.win)}
              </div>
              <div>победы</div>
            </div>
            <div className="player-score" data-player="1">{playersScore['1']}</div>
            <div className="player-name-div">
              <div className="player-name">Игрок 1</div>
              <div data-player="1" className="player-underline active"></div>
            </div>
          </div>
          <div className="container">
            {cells.map((item, i) => 
            item.type !== 0 ? (
              <Cell
                display={item.display}
                value={item.value}
                key={i}
                index={item.index}
                id={item}
                type={item.type}
                active={active.includes(item.index)}
                activeCards={active}
                setActive={setActive}
                openedCardsCount={openedCardsCount}
                setOpenedCardsCount={setOpenedCardsCount}
                openedCards={openedCards}
                setOpenedCards={setOpenedCards}
                cells={cells}
                setCells={setCells}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                playersScore={playersScore}
                setPlayersScore={setPlayersScore}
              ></Cell>
            ) : (
              <Cell
                display={false}
              ></Cell>
            ))}
          </div>
          <div className="sideframe">
            <div className="sideframe-cards-container losses">
              <div className="cards-stack">
                {renderWithCounter(item => item.player === 2 && !item.win)}
              </div>
              <div>потери</div>
            </div>
            <div className="sideframe-cards-container wins">
              <div className="cards-stack">
                {renderWithCounter(item => item.player === 2 && item.win)}
              </div>
              <div>победы</div>
            </div>
            <div className="player-score" data-player="2">{playersScore['2']}</div>
            <div className="player-name-div">
              <div className="player-name">Игрок 2</div>
              <div data-player="2" className="player-underline"></div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;