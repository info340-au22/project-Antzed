import React, {useState} from "react";

export function UserForm(props) {

    const [userObj, setUserObj] = useState(props.userInfo)
    

    function onClick(event) {
        props.userInfoCallback(userObj);
    }

    function handleChange(event) {
        const value = event.target.value;
        setUserObj({
            ...userObj,
            [event.target.name]: value
        });
    }

    

    return (
        <div className="card user-card">
            <img src="../img/blank-profile-picture.jpg" alt="user profile picture"></img>
            <div className="input-group mb-4">
                <UserInput type="firstName" id="firstNameInput" placeholder="First Name" value={userObj.firstName} onChangeValue={handleChange} />
                <UserInput type="lastName" id="lastNameInput" placeholder="Last Name" value={userObj.lastName} onChangeValue={handleChange} />
            </div>
            <div className="form-group mb-4">
                <UserInput type="address" id="addressInput" placeholder="Address" value={userObj.address} onChangeValue={handleChange} />
            </div>
            <div className="form-group mb-4">
                <UserInput type="email" id="emailInput" placeholder="Email" value={userObj.email} userInfo={userObj} onChangeValue={handleChange} />
            </div>
            <div className="form-group mb-4">
                <UserInput type="hikingLevel" id="hikingInput" placeholder="Hiking Level" value={userObj.hikingLevel} onChangeValue={handleChange} />
            </div>
            <div className="form-group mb-4">
              <textarea name="bio" className="form-control form-control-lg textinput" placeholder="About Me" value={userObj.bio} onChange={handleChange}></textarea>
            </div>
            <button className="button" onClick={onClick} >Change</button>
        </div>
    )
}

function UserInput(props) {
    return (
        <input text="text" className="form-control form-control-lg inputfield" name={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChangeValue}></input>
    )
}