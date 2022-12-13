import React, {useState, useEffect} from "react";
import {getDatabase, ref, set as firebaseSet, onValue} from "firebase/database";

export function UserForm(props) {
    const [userObj, setUserObj] = useState(props.userInfo);
    
    useEffect(() => {
    const db = getDatabase();
    const user = ref(db, "user/allUsers/" + userObj.userId);

    const offFunction = onValue(user, (snapshot) => {
      const userData = snapshot.val();
      setUserObj(userData)
    })

    function cleanup() {
      offFunction();
    }
    return cleanup;
  }, []);

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
            <div className="user-upload">
                <img src={userObj.img} alt={userObj.firstName}></img>
                <button className="btn btn-sm btn-secondary me-2">Choose Image</button>
            </div>

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
            <button className="button" onClick={onClick} >Save to Profile</button>
        </div>
    )
}

function UserInput(props) {
    return (
        <input text="text" className="form-control form-control-lg inputfield" name={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChangeValue}></input>
    )
}