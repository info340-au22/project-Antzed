import React from "react";

export function UserProfile(props) {
    return (
        <div className="card user-card">
            <img src="../img/blank-profile-picture.jpg" alt="user profile picture"></img>
            <p className="mb-1 mt-3 h3 font-weight-bold">Cody Tu</p> 
            <p>Address</p>
            <button type="button" className="btn btn-primary btn-lg mb-2 mt-5 width-50">Profile</button>
            <button type="button" className="btn btn-primary btn-lg mb-2">Saved Trails</button>
            <button type="button" className="btn btn-primary btn-lg mb-2">Hike History</button>
          </div>
    )
}