import React, {useState, useEffect} from "react";
import {getDatabase, onValue, ref, set as firebaseSet, push as firebasePush} from "firebase/database";

export function RecentActivity(props) {
    const [savedTrails, setSavedTrails] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const trails = ref(db, "trail/trail cards")

        const offFunction = onValue(trails, (snapshot) => {
            const trailObj = snapshot.val();
            const objKeys = Object.keys(trailObj);
            const trailArray = objKeys.map((keyString) => {
                return trailObj[keyString];
            });
            const isSavedArray = trailArray.filter((trail) => {
                return trail.isSaved == true;
            })
            setSavedTrails(isSavedArray);
        })

        function cleanup(){
            offFunction();
        }
        return cleanup;
    }, [])

    const recentTrails = savedTrails.map((trail, index) => {
        trail.id = "Trails_" + index + 1;
        return <RecentRow key={trail.id} trailInfo={trail} />
    })
    
    return (
        <div className="card user-card mb-3 ms-3">
            <h1 className="text-light mb-4">Saved Trails</h1>
            <div className="main-card">
                {recentTrails}
            </div>
          </div>
    )
}

function RecentRow(props) {
    return (
        <div className="trail">
            <p className="mb-1 h3 trail-header">{props.trailInfo.title}:</p>
            <p className="ms-5 mb-0"> Difficulty: {props.trailInfo.difficulty}</p>
            <p className="ms-5 mb-0"> Popularity: {props.trailInfo.popularity}</p>
            <p className="ms-5 mb-1"> Status: {props.trailInfo.status}</p>
        </div>
    )
}