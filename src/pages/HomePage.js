import React, { useEffect } from "react";
import Popup from "../component/Popup";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";

import {getDatabase, ref, set, onValue} from 'firebase/database';
import { useForm } from "react-hook-form";
import { UploadForm } from "../component/Home_uploadForm";
import { Card } from "../component/Home_card";
import { SectionBPopUpContent } from "../component/Home_sectionBPopUpContent";
let title;
let searchResult;
let FullBlogData;

export default function HomePage(props) {
    let currentUser = props.currentUser;
    let currentUserName = [currentUser.firstName, currentUser.lastName].join(" ");
    //blog data on firebase in section b
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        let blogRef = ref(db, 'blogs/blogs');

        const offFunction = onValue(blogRef, (snapshot) => {
            const valueObj = snapshot.val();
            const objKeys = Object.keys(valueObj);
            const objArray = objKeys.map((keystring) => {
                const blogObj = valueObj[keystring];
                blogObj.key = keystring;
                return blogObj;
            });
            setBlogData(objArray);
            FullBlogData = objArray;
        });

        function cleanup(){
            offFunction();
        }
        return cleanup;
    }, []);

    //search bar in section a
    const [query, setQuery] = useState("");
    function handleSearch(event){
        event.preventDefault();
        searchResult = event.target.value.toLowerCase();
    }
    
    const navigate = useNavigate();

    const blogSection = useRef(null);
    const post = useRef(null);
    const scrollToSection = (elementRef) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: "smooth"
        });
    }


    // if query include "/trail", take the string after "/trail" and make it into a variable named otherPageSearchTerm
    // then set the access the data with reference /HomeTrailBridge/searchterm in firebase and set that data into the variable otherPageSearchTerm

    if (query.includes("/trail ") && query.length > 7){
        let otherPageSearchTerm = query.slice(7);
        const db = getDatabase();
        let searchTermRef = ref(db, 'HomeTrailBridge/searchterm');
        let isActiveRef = ref(db, 'HomeTrailBridge/isActive');
        set(searchTermRef, otherPageSearchTerm);
        set(isActiveRef, true);
        navigate("/trail");
    }

    if(query === "/trail"){
        navigate("/trail");
    }
    if (query === "/shop"){
        navigate("/shop");
    }
    if(query === "/user"){
        navigate("/user");
    }
    if(query === "blog"){
        scrollToSection(blogSection)
    }
    // only the cards in section b that contains the search result will be shown
    // loop through the blogData array and check if the title contains the search result

    if(query != ""){
        let result = blogData.some((blog) => {
            return blog.title.toLowerCase().includes(query.toLowerCase());
        });
        

        if(result){
            let filteredBlogData = blogData.filter((blog) => {
                return blog.title.toLowerCase().includes(query.toLowerCase());
            });

            setBlogData(filteredBlogData);
            scrollToSection(blogSection);
        
        }

        setQuery("");
        
    }
    function handleReset(fullData){
        setBlogData(fullData);
    }


    //popup in section b
    const [showPopup, setShowPopup] = useState(false);
    function handlePopup(key){
        setShowPopup(true);
        title = key;
    }

    const { register, handleSubmit, reset, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        const currentLastindex = blogData.indexOf(blogData[blogData.length - 1])
        const newKey = currentLastindex + 1;
        const db = getDatabase();
        const blogRef = ref(db, 'blogs/blogs/'+ newKey);
        set(blogRef, data);

        reset();
        
    }
    
    let submitStuff = [register, handleSubmit, onSubmit, errors];

    const [sectionBPopup, setSectionBPopup] = useState(false);
    const [uploadFormPopup, setUploadFormPopup] = useState(false);
    const popupConditions = [setSectionBPopup, setUploadFormPopup];

    // when the popup is closed, the popup will be hidden
    if(!showPopup){
        if(sectionBPopup || uploadFormPopup){
            setSectionBPopup(false);
            setUploadFormPopup(false);
        }
    }

    function ReturnPopup(){
        if (sectionBPopup){
            return <Popup setToFalse={setBlogData} trigger={showPopup} setTrigger={setShowPopup} content={<SectionBPopUpContent title={title} blogData={blogData}/>}/>
        }
        if(uploadFormPopup){
            return <Popup setToFalse={setUploadFormPopup} trigger={showPopup} setTrigger={setShowPopup} content={<UploadForm   currentUserName={currentUserName} submitStuff={submitStuff}/>}/>
        }
    }

    return (
        <div>
            <SectionA setQuery={setQuery} handleSearch={handleSearch}/>
            <SectionB popupConditions={popupConditions} handleReset={handleReset} blogSection={blogSection} showPopup = {showPopup} setShowPopup ={setShowPopup} handlePopup={handlePopup} blogData={blogData}/>  
            <ReturnPopup/>
        </div>
    )
}

function SearchBar(props){
    let setQuery = props.setQuery; 
    let handleSearch = props.handleSearch;
    const searchBarStyle= "position-relative home-searchBar";

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          setQuery(searchResult);
        }
    }

    return (
        <div className={searchBarStyle}>
          <div className="align-item-center justify-content-center px-5">
            <div className="input-group rounded">
              <input type="search" className="form-control rounded" placeholder="Try search 'lake' or '/trail poo poo point'" aria-label="a form for inputing wanted search terms" aria-describedby="search-addon" onChange={handleSearch} onKeyDown={handleKeyDown}/>
              <span className="input-group-text border-0" id="search-addon">
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" aria-label="a button that initiate search" onClick={() => setQuery(searchResult)}>Search</button>
              </span>
            </div>
          </div>
        </div>
    )
}

function SectionA(props){
    let setQuery = props.setQuery;
    let handleSearch = props.handleSearch;
    let sectionAStyle = "home-background height-100vh background-no-repeat background-center";
    return (
        <div>
            <section className={sectionAStyle}>
                &nbsp;
                <SearchBar setQuery = {setQuery} handleSearch={handleSearch}/>
            </section>
        </div>
    )
}


function SectionB(props){
    
    let sectionBStyle = "home-sectionB height-100vh review-background  pattern-diagonal-lines-sm  overflow-auto ";
    const [showPopup, setShowPopup, handlePopup] = [props.showPopup, props.setShowPopup, props.handlePopup];
    const cardList = [];

    let blogSection = props.blogSection;
    
    let blogData = props.blogData;
    let handleReset = props.handleReset;
    const [setSectionBPopup, setUploadFormPopup]  = props.popupConditions;


    blogData.map((blog) => {
        cardList.push(<Card author={blog.author} setSectionBPopup={setSectionBPopup} key={blog.title} showPopup={showPopup} setShowPopup={setShowPopup} handlePopup={handlePopup} title={blog.title} description={blog.description}  img={blog.img}/>);
    })

    function set(){
        setUploadFormPopup(true);
    }

    return(
        <div >
            <section ref={blogSection} className={sectionBStyle}>
                <div className="container">
                    <div className="row">
                        &nbsp;
                        {/* button that add blogs */}
                        <button className="btn btn-success me-3 my-2 my-sm-0" type="submit" aria-label="a button that add blogs" onClick={() =>{setShowPopup("here"); set()}}>Add your own blog</button>
                        {cardList}
                        
                        {/* button that reset the search */}
                        <button className="btn btn-outline-dark my-2 my-sm-0" type="submit" aria-label="a button that rest search" onClick={() => handleReset(FullBlogData)}>Reset</button>
                        
                    </div>
                </div>
            </section>
        </div>
        
    )
}





