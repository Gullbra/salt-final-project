import './App.css';
import { useState, useEffect } from 'react'
import Header from './components/Header';
import List from './components/List';
import axios from 'axios';


function App() {
  
  const [partyState, setPartyState] = useState([]);
  
  useEffect(() => {
    axios.get('https://event-app-3zx2.onrender.com/events')
      .then(response => setPartyState(response.data))
  }, [])

  return (
    <div className="App">
      <Header />
      <List partyState={partyState} />
    </div>
  );
}

export default App;
