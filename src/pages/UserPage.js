import React, {useState, useEffect} from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

import {RecentActivity} from "../component/UserPage_Recent";
import {UserForm} from "../component/UserPage_UserForm";
import {UserProfile} from "../component/UserPage_UserProfile";
import {Navigate} from 'react-router-dom';  
import {getDatabase, onValue, ref, set as firebaseSet, push as firebasePush, set} from "firebase/database";



export default function UserPage(props) {
  const [userInput, setUserInput] = useState({userId: props.currentUser.userId, firstName: props.currentUser.firstName, lastName: props.currentUser.lastName, address: props.currentUser.address, email: props.currentUser.email, hikingLevel: props.currentUser.hikingLevel, bio: props.currentUser.bio, img: props.currentUser.img}); 
  useEffect(() => {
    const db = getDatabase();
    const user = ref(db, "user/allUsers/" + props.currentUser.userId);

    const offFunction = onValue(user, (snapshot) => {
      const userData = snapshot.val();
      setUserInput(userData)
    })

    function cleanup() {
      offFunction();
    }
    return cleanup;
  }, []);

  function userInfoCallback(userObj, userImg) {
    setUserInput(userObj);
    const db = getDatabase();
    const users = ref(db, "user/allUsers/" + props.currentUser.userId);
    firebaseSet(users, {...userObj, img: userImg});
  }
  // users
  if (!props.currentUser.userId) {
    return <Navigate to="/" />
  }
  
  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row user-row">
            <div className="col-lg-3 d-lg-block d-none pe-0">
              <section className="side-navigation">
                <UserProfile userInfo={userInput} />
              </section>
            </div>
            {/* <!-- user profile --> */}
            <div className="col-lg-5 col-sm-12 no-gutters limit pe-0">
              <section className="user-section">
                <UserForm userInfo={userInput} userInfoCallback={userInfoCallback} />
              </section>
            </div>
            {/* <!-- recent --> */}
            <div className="col-lg-4 col-sm-12 no-gutters limit ps-0 pe-0">
              <section className="recent-section">
                <RecentActivity userInfo={userInput} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}