import React from "react";

export function FriendList(props) {
    const sampleFriends = [
        {id: "", pfp: "../img/hamster-profile.jpg", name: "Cohan Kenny"},
        {id: "", pfp: "../img/hamster-profile.jpg", name: "Aleesha Mcleod"},
        {id: "", pfp: "../img/hamster-profile.jpg", name: "Yasin Short"},
        {id: "", pfp: "../img/hamster-profile.jpg", name: "Ellise Perkins"}
    ]

    const friendsRows = sampleFriends.map((friend, index) => {
        friend.id = "Friend_" + index + 1;
        return <FriendRow key={friend.id} friendInfo={friend} />
    })

    return (
        <div className="card user-card mb-0 mt-1 ms-3 me-4">
            <h1 className="text-light mb-4">Friends</h1>
            <div className="main-card">
              {friendsRows}
            </div>
          </div>
    )
}

function FriendRow(props) {
    return (
        <div className="row me-0">
                <div className="col-auto ps-0">
                  <img src={props.friendInfo.pfp} alt={props.friendInfo.name}></img>
                </div>
                <div className="col-auto friend-body">
                  <p className="h6">{props.friendInfo.name}</p>
                  <img src="../img/message-icon.png" alt="message icon"></img>
                </div>
              </div>
    )
}