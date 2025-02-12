import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Main from './pages/Main';
import Join from './pages/Join';
import ResultReport from './pages/resultReport';
import RecordingPage from './pages/RecordingPage';
import PlaylistInner from './PlPage/PlaylistInner';
import PlaylistPage from './PlPage/PlaylistPage';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  return (
    <div className='w-full h-screen flex justify-center'>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route
            path='/main'
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route path='/join' element={<Join />} />
          <Route
            path='/report'
            element={
              <ProtectedRoute>
                <ResultReport />
              </ProtectedRoute>
            }
          />
          <Route
            path='/recording'
            element={
              <ProtectedRoute>
                <RecordingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/playlist'
            element={
              <ProtectedRoute>
                <PlaylistPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/tracklist/:index'
            element={
              <ProtectedRoute>
                <PlaylistInner />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
