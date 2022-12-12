import React, {useState} from "react";
import Form from 'react-bootstrap/Form';

export function CardSelect(props) {
    const [selectedDiffCards, setSelectedCards] = useState("")

    const handleSelectDiff = (event) => {
        if (event.target.value !== selectedDiffCards) {
          const selectValue = event.target.value
          setSelectedCards(selectValue)
        }
      }
    const handleReset = (event) => {
        props.applyFilterCallBack('')
    }
    const handleClick = (event) => {
        props.applyFilterCallBack(selectedDiffCards)
    }
    const optionElems = props.hikeOptions.map((diff) => {
        return <option key={diff} value={diff}>{diff}</option>
    });
    return (
        <div className="row align-items-center my-3">
            <div className="col-auto">
                <Form.Select id="hikeSelect" value={selectedDiffCards} onChange={handleSelectDiff}>
                    <option value={selectedDiffCards}>All difficulties</option>
                    {optionElems}
                </Form.Select>
            </div>
            <div className="col-auto">
                <button id="submitButton" type="submit" className="btn btn-success" onClick={handleClick}>Apply Filter</button>
            </div>
            <div className="col-auto">
                <button id="resetButton" className="btn" onClick={handleReset}>Reset Filter</button>
            </div>
        </div>
    )
}