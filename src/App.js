import logo from './logo.svg';
import './App.css';
import { HomePage } from './HomePage';
import NavigationBar from './NavigationBar';
import { useState } from 'react';

function App() {
  const [openPage, setOpenPage] = useState('Grafico')
  console.log(openPage)

  return (
    <div className="App">
      <header className="App-header">
        <NavigationBar
          changedElement={(e) => setOpenPage(e)}
        ></NavigationBar>

        <HomePage
          openedPage={openPage}
        ></HomePage>
      </header>
    </div>
  );
}

export default App;
