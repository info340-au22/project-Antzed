import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import TrailPage from "./pages/TrialPage";
import UserPage from "./pages/UserPage";
import ShopPage from "./pages/ShopPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import NoPage from "./pages/NoPage";
import TRAILPAGE_CARD_DATA from './data/trailCardData.json'
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import { useLocation } from "react-router-dom";
import {getAuth, EmailAuthProvider, GoogleAuthProvider, onAuthStateChanged} from 'firebase/auth';
import {StyledFirebaseAuth} from 'react-firebaseui';
import {getDatabase, onValue, ref, set as firebaseSet, push as firebasePush} from "firebase/database";


export default function App() {
  // users
  const [currentUser, setCurrentUser] = useState({"userId": null, "userName": "Log Out", "img": "/img/blank-profile-picture.jpg"});

  useEffect(() => {
    const auth = getAuth();
    const offFunction = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        firebaseUser.userId = firebaseUser.uid;
        const split = firebaseUser.displayName.split(" ");
        firebaseUser.userName = split[0]
        const db = getDatabase();
        const user = ref(db, "user/allUsers/" + firebaseUser.userId);
        onValue(user, (snapshot) => {
          const userInfo = snapshot.val();
          if (userInfo === null) {
            firebaseSet(user, {userId: firebaseUser.userId, firstName: firebaseUser.userName, lastName: split[1], email: firebaseUser.email});
          }
          if (!("address" in userInfo)) {
            userInfo.address = "";
          }
          if (!("hikingLevel" in userInfo)) {
            userInfo.hikingLevel = "";
          }
          if (!("bio" in userInfo)) {
            userInfo.bio = "";
          }
          if (!("img" in userInfo)) {
            userInfo.img = "/img/blank-profile-picture.jpg";
          }
          if (!("trails" in userInfo)) {
            userInfo.trails = [{isSaved: false}, {isSaved: false}, {isSaved: false}, {isSaved: false}, {isSaved: false}, {isSaved: false}, {isSaved: false}, {isSaved: false}, {isSaved: false}];
          }
          setCurrentUser(userInfo)
        });

      } else {
        setCurrentUser({"userId": null, "userName": "Log Out", "img": "/img/blank-profile-picture.jpg"});
      }
    }, [])

    function cleanup() {
      offFunction();
    }
    return cleanup;
  }, [])

  // re-render the navbar when the page changes using useLocation hook
  let pathname = useLocation().pathname;
  pathname = pathname.substring(1);
  pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);

  return (
    <div>
        <header>
          <NavBar pageName={pathname} currentUser={currentUser} />
        </header>
        
        <main>
          <Routes>
            <Route path="/" />
              <Route index element={<HomePage currentUser={currentUser}/>} />
              <Route path="login" element={<SignInPage currentUser={currentUser} />} />
              <Route path="trail" element={<TrailPage trailData={TRAILPAGE_CARD_DATA} currentUser={currentUser} />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="user" element={<UserPage currentUser={currentUser} />} />
              <Route path="*" element={<NoPage />}/>
          </Routes>
        </main>

        <footer>
          <Footer isInherit={true}/>
        </footer>
    </div>
  );
}