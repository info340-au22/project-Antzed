import React, {useState} from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

import {FriendList} from "../component/UserPage_Friend";
import {RecentActivity} from "../component/UserPage_Recent";
import {UserForm} from "../component/UserPage_UserForm";
import {UserProfile} from "../component/UserPage_UserProfile";

const sampleUser = {firstName: "Cody", lastName: "Tu", address: "711-2880 Nulla St. Mankato Mississippi 96522", email: "sample@gmail.com", hikingLevel: "Beginner", bio: "Mitchell Morrison is an upcoming video producer and editor who believes in the art of visual organization. He is a recent graduate from the University of Washington and focused on post-production during his time studying there. He was introduced to the magical world of visual art production by watching his father work on editing commercials growing up and has been working towards his dream of becoming a video editor ever since."}

export default function UserPage(props) {
    const [userInput, setUserInput] = useState(sampleUser);

    function userInfoCallback(userObj) {
        setUserInput(userObj);
    }

    return (
        <div>
            <NavBar pageName = "User"/>
                <main>
    <div class="container-fluid">
      <div class="row" style="margin: auto">
        <div class="col-lg-3 d-lg-block d-none pe-0">
        <section class="side-navigation">
          <UserProfile userInfo={userInput} />
        </section>
        </div>
{/* <!-- user profile --> */}
        <div class="col-lg-5 col-sm-12 no-gutters limit pe-0">
        <section class="user-section">
          <UserForm userInfo={userInput} userInfoCallback={userInfoCallback} />
        </section>
        </div>
{/* <!-- recent --> */}
        <div class="col-lg-4 col-sm-12 no-gutters limit ps-0 pe-0"> 
        <section class="recent-section">
          <RecentActivity />
        </section>
{/* <!-- friend --> */}
        <section class="friend-section">
          <FriendList />
        </section>
      </div>
    </div>     
    </div>
  </main>
            <Footer />
        </div>
    )
}