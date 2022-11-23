import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrailPage from "./pages/TrialPage";
import UserPage from "./pages/UserPage";
import ShopPage from "./pages/ShopPage";
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import TRAILPAGE_CARD_DATA from './data/trailCardData.json'

export default function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" />
          <Route index element={<HomePage />} />
          <Route path="trail" element={<TrailPage trailData={TRAILPAGE_CARD_DATA} />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="*" elemnt={<NoPage />}/>
      </Routes>
    </Router>
    
     );
}