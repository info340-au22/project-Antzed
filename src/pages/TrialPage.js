import React, {useEffect, useState} from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { TrailCards } from "../component/Trailcards.js";
import { CardSelect } from "../component/Trailfilter.js";
import MODAL_DATA from "../data/trailSeeMoreData.json";
import { getDatabase, ref, set as firebaseSet, onValue, push as firebasePush } from 'firebase/database' 

export default function TrailPage(props) {
    const [displayedCards, setDisplayedCards] = useState([])
    const [filterDisplay, setFilterDisplay] = useState([])

    useEffect(() => {
        const db = getDatabase()
        const trailCardsRef = ref(db, "trail/trail cards") 
        let cardArrayOutside;

        const offFunction = onValue(trailCardsRef, (snapshot) => {
            const cardObj = snapshot.val();

            const cardKeys = Object.keys(cardObj);

            const cardArray = cardKeys.map((keys) => {
                const theCardContents = cardObj[keys];
                theCardContents.key = keys
                return theCardContents
            })
            cardArrayOutside = cardArray

            setDisplayedCards(cardArray)
            setFilterDisplay(cardArray)

        })

        //enable cross page search
        const bridge = ref(db, "HomeTrailBridge")
        const searchtermRef = ref(db, "HomeTrailBridge/searchterm")
        const isActiveRef = ref(db, "HomeTrailBridge/isActive")
        const offFunction1 = onValue(bridge, (snapshot) => {
    
            const bridgeObj = snapshot.val()
            const searchTerm = bridgeObj.searchterm
            const isActive = bridgeObj.isActive


            let tempArray = cardArrayOutside
            //if search term is not empty
            if (searchTerm !== "" && isActive == true){
                //filter temp array with search term

                tempArray = tempArray.filter((element) => {
                    return element.title.toLowerCase().includes(searchTerm.toLowerCase())
                })

                if (tempArray.length == 0) {
                    tempArray = cardArrayOutside
                    alert("No results found")
                }

                setDisplayedCards(tempArray)
            }
            
            firebaseSet(searchtermRef, "")
            firebaseSet(isActiveRef, false)
        })

        function cleanup() {
            offFunction();
            offFunction1();
        }

        return cleanup

    }, [])

    const applyFilter = (diff) => {
        if (diff == '') {
            setDisplayedCards(filterDisplay)
          } else {
            const difficulty = filterDisplay.filter((element) => {
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
                <TrailCards cards={displayedCards} modalData={MODAL_DATA} currentUser={props.currentUser} />
            </main>

        </div>
    )
}
