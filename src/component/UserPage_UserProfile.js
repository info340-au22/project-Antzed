import React from "react";

export function UserProfile(props) {
    return (
        <div className="card user-card">
            <img src={props.userInfo.img} alt={props.userInfo.firstName}></img>
            <p className="mb-1 mt-3 h3 font-weight-bold">{props.userInfo.firstName} {props.userInfo.lastName}</p> 
            <p>{props.userInfo.address}</p>
            
            <p className="mb-1">Email: <a href={props.userInfo.email}>{props.userInfo.email}</a></p>
            <p>Hiking Level: {props.userInfo.hikingLevel}</p>
            <p className="mt-3 h5 font-weight-bold">About Me</p>
            <p>{props.userInfo.bio}</p>
          </div>
    )
}