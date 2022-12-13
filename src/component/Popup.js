import React from "react";
import { Button } from "react-bootstrap";

export default function Popup(props){
    let popupClass = "popup"
    let setToFalse = props.setToFalse;

    function set(){
        setToFalse(false)
    }
    
    return (props.trigger) ? (
        <div className={popupClass}>
                <div className="popup-inner">
                <Button className="close-btn" variant="secondary" onClick={() =>{props.setTrigger(false)}}>X</Button>
                    <h1>{props.content}</h1>
                </div>
        </div>
    ):"";
}