import React, {useState} from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { TrailCards } from "../component/Trailcards.js";
import { CardSelect } from "../component/Trailfilter.js";
import MODAL_DATA from "../data/trailSeeMoreData.json";

export default function TrailPage(props) {
    const [displayedCards, setDisplayedCards] = useState(props.trailData)

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
                <div className="border-bottom my-2">
                    <CardSelect hikeOptions={uniqueHikeDiff} applyFilterCallBack={applyFilter}/>
                </div>
                <TrailCards cards={displayedCards} modalData={MODAL_DATA}/>
            </main>

        </div>
    )
}
