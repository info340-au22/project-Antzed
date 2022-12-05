import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrailPage from "./pages/TrialPage";
import UserPage from "./pages/UserPage";
import ShopPage from "./pages/ShopPage";
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import TRAILPAGE_CARD_DATA from './data/trailCardData.json'
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import { useLocation } from "react-router-dom";


export default function App() {
  
  // re-render the navbar when the page changes using useLocation hook
  let pathname = useLocation().pathname;
  console.log(pathname);
  // get ride of the first slash
  pathname = pathname.substring(1);
  //make first letter uppercase
  pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  console.log(pathname + "new");





  return (
    <div>
     
      
        <header>
          <NavBar pageName={pathname}/>
        </header>
        
        <body>
          <Routes>
            <Route path="/" />
              <Route index element={<HomePage />} />
              <Route path="trail" element={<TrailPage trailData={TRAILPAGE_CARD_DATA} />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="user" element={<UserPage />} />
              <Route path="*" element={<NoPage />}/>
          </Routes>

        </body>
        

        <footer>
          <Footer isInherit={true}/>
        </footer>
        
      

    </div>
    
    
     );
}