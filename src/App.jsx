import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './landing/LandingPage';
import MaterialsPage from './materials/MaterialsPage';
import NotFoundPage from './404/NotFoundPage';

function App() {
  return (
    <>
      <Routes>
        {/* TODO: Add landing page --> */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/materials" element={<MaterialsPage />} />
        {/* TODO: Add lecture page route --> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
