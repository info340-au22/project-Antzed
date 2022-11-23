import React from "react";

export function RecentActivity(props) {
    const sampleTrails = [
        {id: "", trailName: "Mailbox Peak", difficulty: "Hard", address: "Mailbox Peak Trail, Washington 98045"},
        {id: "", trailName: "Poo Poo Point", difficulty: "Moderate/Hard", address: "Poo Poo Point Trail, Washington 98027"},
        {id: "", trailName: "Rattlesnake Ledge", difficulty: "Moderate", address: "Rattlesnake Ridge, Washington 98045"},
        {id: "", trailName: "Margaret Lake", difficulty: "Moderate/Hard", address: "Margaret Lake, Washington 98068"}
    ]

    const recentTrails = sampleTrails.map((trail, index) => {
        trail.id = "Trails_" + index + 1;
        return <RecentRow key={trail.id} trailInfo={trail} />
    })
    
    return (
        <div className="card user-card mb-3 ms-3">
            <h1 className="text-light mb-4">Recent Activity</h1>
            <div className="main-card">
                {recentTrails}
            </div>
          </div>
    )
}

function RecentRow(props) {
    return (
        <div className="trail">
            <p className="mb-2 h4">{props.trailInfo.trailName}</p>
            <p className="mx-5">{props.trailInfo.difficulty} | {props.trailInfo.address}</p>
        </div>
    )
}