import React from "react";
import { SendX } from "react-bootstrap-icons";

export default function Popup(props){
    let popupClass = "popup"
    let setToFalse = props.setToFalse;

    function set(){
        setToFalse(false)
    }

    // clear form with id "uploadForm"
 

    
    return (props.trigger) ? (
        <div className={popupClass}>
                <div className="popup-inner">
                <button className="close-btn" onClick={() =>{props.setTrigger(false)}}>close me</button>
                    <h1>{props.content}</h1>
                </div>
        </div>
    ):"";
}