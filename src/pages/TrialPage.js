import React, {useEffect, useState} from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { TrailCards } from "../component/Trailcards.js";
import { CardSelect } from "../component/Trailfilter.js";
import MODAL_DATA from "../data/trailSeeMoreData.json";
import { getDatabase, ref, set as firebaseSet, onValue, push as firebasePush } from 'firebase/database' 

export default function TrailPage(props) {
    const [displayedCards, setDisplayedCards] = useState([])

    useEffect(() => {
        const db = getDatabase()
        const trailCardsRef = ref(db, "trail/trail cards") 

        const offFunction = onValue(trailCardsRef, (snapshot) => {
            const cardObj = snapshot.val();

            const cardKeys = Object.keys(cardObj);

            const cardArray = cardKeys.map((keys) => {
                const theCardContents = cardObj[keys];
                theCardContents.key = keys
                return theCardContents
            })

            setDisplayedCards(cardArray)

        })

        function cleanup() {
            offFunction();
        }

        return cleanup

    }, [])

    const applyFilter = (diff) => {
        if (diff == '') {
            setDisplayedCards(props.trailData)
          }else {
            const difficulty = props.trailData.filter((element) => {
              return element.difficulty === diff
            })
            setDisplayedCards(difficulty)
        }
    }
    const uniqueHikeDiff = [...new Set(props.trailData.reduce((all, current) => {
        return all.concat([current.difficulty]);
      }, []))].sort();
    return (
        <div>
            <main>
                <div className="border-bottom m-2">
                    <CardSelect hikeOptions={uniqueHikeDiff} applyFilterCallBack={applyFilter}/>
                </div>
                <TrailCards cards={displayedCards} modalData={MODAL_DATA}/>
            </main>

        </div>
    )
}
