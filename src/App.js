import React from 'react'

import './App.scss'
import 'font-awesome/css/font-awesome.min.css'


import AppBar from 'components/app-bar/AppBar';
import BoardBar from 'components/board-bar/BoardBar';
import BoardContent from 'components/board-content/BoardContent'


function App() {
  return (
    <div className="trello">
      <AppBar/>
      <BoardBar/>
      <BoardContent/>
      </div>
  );
}

export default App;
