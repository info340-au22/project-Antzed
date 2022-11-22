import React from "react";

export default function Popup(props){
    return (props.trigger) ? (
        <div className="popup">
                <div className="popup-inner">
                <button className="close-btn" onClick={() =>props.setTrigger(false)}>close me</button>
                    <h1>{props.content}</h1>
                </div>
        </div>
    ):"";
}