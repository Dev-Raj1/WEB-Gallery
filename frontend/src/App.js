
import './App.css';
import HomePage from './pages/HomePage';
import Create from './pages/Create'
import { Route, Routes } from 'react-router';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/create' element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
