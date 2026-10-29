import Home from './components/Home';
import SmoothScroll from './components/SmoothScroll';
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <SmoothScroll>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </SmoothScroll>
    </HashRouter>
  );
}

export default App;