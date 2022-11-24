import React, {useState} from "react";

export function CardSelect(props) {
    const [selectedCards, setSelectedCards] = useState("")

    const handleSelect = (event) => {
        if (event.target.value !== selectedCards) {
          const selectValue = event.target.value
          setSelectedCards(selectValue)
        }
      }
    const handleClick = (event) => {
        props.applyFilterCallBack(selectedCards)
    }

    const optionElems = props.hikeOptions.map((diff) => {
        return <option key={diff} value={diff}>{diff}</option>
    });
    return (
        <div className="row align-items-center my-3">
            <div className="col-auto">
                <select id="teamSelect" className="form-select" value={selectedCards} onChange={handleSelect}>
                <option value={selectedCards}>Show all Difficulties</option>
                {optionElems}
                </select>
            </div>
            <div className="col-auto">
                <button id="submitButton" type="submit" className="btn btn-warning" onClick={handleClick}>Apply Filter</button>
            </div>
        </div>
    )
}