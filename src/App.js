import React, {useEffect} from 'react';
import './App.css';
import AuthForm from './components/AuthForm/AuthForm.js';
import Middleframe from './components/Frames/Middleframe.js';
import Sideframe from './components/Frames/Sideframe.js';
import LongPolling from './components/LongPolling.js';
import axios from 'axios';
import {AppProvider, useAppContext} from './AppProvider.jsx';
import Header from './components/Frames/Header.jsx'
import Footer from './components/Frames/Footer.jsx'
import Modal from './components/Frames/Modal.jsx'

function Root() {
  const {
    firstPlayerName, secondPlayerName,
    firstPlayerIsReady, secondPlayerIsReady,
    cellsFirstPlayer, cellsSecondPlayer,
    appBackground,
    backgroundShadowOpacity,
    opacityMainframeBlock
  } = useAppContext();

  // useEffect(() => {
  //   // subscribe();
  //   setTimeout(() => {
  //     changeCellWidth();
  //   }, 1000)
  // }, [secondPlayerIsReady]);

  // const subscribe = async () => {
  //     try {
  //         const {data} = await axios.get('http://localhost:5000/get-openedcards');
  //         console.log(data);
  //         setOpenedCards(data);
  //         await subscribe();
  //     } catch (err) {
  //         setTimeout(() => {
  //             subscribe();
  //         }, 500);
  //     }
  // };

  // const updateOpenedCards = async (data) => {
  //   await axios.post('http://localhost:5000/update-openedcards', data);
  // };

  // useEffect(() => {
  //   updateOpenedCards(openedCards);
  // }, [openedCardsCount]);

  // localStorage.setItem('userId', '');

  return (
    <div className={`App ${appBackground}`}>
      <div className={'background-shadow'} style={{'opacity': backgroundShadowOpacity}}></div>
      {localStorage.getItem('userId') === '' ? (
          <AuthForm />
        ) : (
          <>
            {/* <Header/> */}
            {firstPlayerIsReady && secondPlayerIsReady ? (
              <div className='mainframe' style={{'opacity': opacityMainframeBlock, 'transition': `opacity ${opacityMainframeBlock === '1' ? '0.5' : '0'}s`}}>
                <Sideframe
                  playerName={firstPlayerName}
                  playerNum={1}
                  cells={[cellsFirstPlayer, cellsSecondPlayer]}>
                </Sideframe>
                <Middleframe
                  mode={'game'}>
                </Middleframe>
                <Sideframe
                  playerName={secondPlayerName}
                  playerNum={2}
                  cells={[cellsSecondPlayer, cellsFirstPlayer]}>
                </Sideframe>
                <Modal/>
              </div>
            ) : (
              <>
                <Middleframe
                  mode={'preparation'}>
                </Middleframe>
                <Modal/>
              </>
            )}
            {/* <Footer/> */}
          </>
        )
      }
    </div>
  );
}

const App = () => (
  <AppProvider>
    <Root />
  </AppProvider>
);

export default App;