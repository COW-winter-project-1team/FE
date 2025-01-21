import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Main from './pages/Main';
import Join from './pages/Join';
import ResultReport from './pages/resultReport';

const App = () => {
  return (
    <div className='w-full h-screen flex justify-center'>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/main' element={<Main />} />
          <Route path='/join' element={<Join />} />
          <Route path='/report' element={<ResultReport />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
