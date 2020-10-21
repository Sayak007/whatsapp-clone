import React,{useState,useEffect} from 'react';
import './App.css';
import Sidebar from "./Components/Sidebar.js";
import Chat from "./Components/Chat.js";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from "./Components/Login.js";
import {useStateValue} from "./StateProvider";

function App() {
  const [{user},dispatch]=useStateValue();

  return (
    <div className="app">
      {!user?(
        <Login/>
      ):(
      <div className="app_body">
        <Router>
          <Sidebar/>
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat/>
            </Route>
            <Route path="/">
              <Chat/>
            </Route>
          </Switch>
        </Router>
        
      </div>
      )}
    </div>
  );
}

export default App;
