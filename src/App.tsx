import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-nft-dark">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}