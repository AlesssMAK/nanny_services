import { Route, Routes } from 'react-router-dom';
// import css from './App.module.css';
import Home from '../../pages/Home';
import Nannies from '../../pages/Nannies/Nannies';
import Favorites from '../../pages/Favorites/Favorites';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nannies" element={<Nannies />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
