import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Main from './pages/Main';
import Join from './pages/Join';
import ResultReport from './pages/resultReport';
// import RecordingPage from './pages/RecordingPage';
import PlaylistInner from './PlPage/PlaylistInner';
import PlaylistPage from './PlPage/PlaylistPage';
import config from '../.env/config';

const App = () => {
  console.log('API URL:', config.apiUrl);
  return (
    <div className='w-full h-screen flex justify-center'>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/main' element={<Main />} />
          <Route path='/join' element={<Join />} />
          <Route path='/report' element={<ResultReport />} />
          {/* <Route path='/recording' element={<RecordingPage />} /> */}
          <Route path='/playlist' element={<PlaylistPage />} />
          <Route path='/tracklist/:index' element={<PlaylistInner />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
