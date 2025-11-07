import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./pages/Landing";
import Main from "./pages/Main";
import Join from "./pages/Join";
import ResultReport from "./pages/ResultReport";
import RecordingPage from "./pages/RecordingPage";
import PlaylistPage from "./pages/PlaylistPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import TrackListPage from "./pages/TrackListPage";
import NotFound from "./pages/NotFound";
import MyPage from "./pages/MyPage";

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
                <TrackListPage />
              </ProtectedRoute>
            }
          />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </div>
  );
};

export default App;
