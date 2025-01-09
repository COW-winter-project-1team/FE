import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Main from './pages/Main';
import Join from './pages/Join';

const App = () => {
  return (
    <div className='max-w-full mx-auto p-4 text-center'>
      <div className='w-full h-screen text-black flex justify-center'>
        <Router>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/main' element={<Main />} />
            <Route path='/join' element={<Join />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
