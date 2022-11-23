import React from "react";

export function FriendList(props) {
    return (
        <div className="card user-card mb-0 mt-1 ms-3 me-4">
            <h1 className="text-light mb-4">Friends</h1>
            <div className="main-card">
              <div className="row">
                <div className="col-auto">
                  <img src="../img/blank-profile-picture.jpg" alt="friend user picture"></img>
                </div>
                <div className="col-auto friend-body">
                  <p className="h6">Friend Name</p>
                  <img src="../img/message-icon.png" alt="message icon"></img>
                </div>
              </div>

              <div className="row">
                <div className="col-auto">
                  <img src="../img/blank-profile-picture.jpg" alt="friend user picture"></img>
                </div>
                <div className="col-auto friend-body">
                  <p className="h6">Friend Name</p>
                  <img src="../img/message-icon.png" alt="message icon"></img>
                </div>
              </div>

              <div className="row">
                <div className="col-auto">
                  <img src="../img/blank-profile-picture.jpg" alt="friend user picture"></img>
                </div>
                <div className="col-auto friend-body">
                  <p className="h6">Friend Name</p>
                  <img src="../img/message-icon.png" alt="message icon"></img>
                </div>
              </div>
            </div>
          </div>
    )
}