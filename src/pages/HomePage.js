import React, { useEffect } from "react";
import Popup from "../component/Popup";
//  import blogData from "../data/hiking-blog.json";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";

import { get, getDatabase, ref, set, onValue} from 'firebase/database';
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";

// Todo: universal search
let title;
let searchResult;
const searchSuggestions = ["trail", "shop", "user", "blog"];
let FullBlogData;

export default function HomePage(props) {
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
    console.log(query);
    
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
        console.log(otherPageSearchTerm);
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
        
        console.log("result" + result);

        if(result){
            let filteredBlogData = blogData.filter((blog) => {
                return blog.title.toLowerCase().includes(query.toLowerCase());
            });
            console.log(filteredBlogData);
    
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


   
    const { register, handleSubmit, reset } = useForm();


    const onSubmit = (data, event) => {
    //    turn data into an object and console log the object
        console.log(data);
        const currentLastindex = blogData.indexOf(blogData[blogData.length - 1])
        const newKey = currentLastindex + 1;
        //upload this data to firebase
        const db = getDatabase();
        //take element of blogdata and console log it
        
        const blogRef = ref(db, 'blogs/blogs/'+ newKey);
        set(blogRef, data);

        reset();
        
    }
    
    let submitStuff = [register, handleSubmit, onSubmit];





    const [sectionBPopup, setSectionBPopup] = useState(false);
    const [uploadFormPopup, setUploadFormPopup] = useState(false);
    const popupConditions = [setSectionBPopup, setUploadFormPopup]
    console.log("sectionB " + sectionBPopup, "upload " + uploadFormPopup);

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
            return <Popup  setToFalse={setUploadFormPopup} trigger={showPopup} setTrigger={setShowPopup} content={<UploadForm submitStuff={submitStuff}/>}/>
        }
    }


    // console.log("full blog data", FullBlogData);
    return (
        <div>
            <SectionA setQuery={setQuery} handleSearch={handleSearch}/>
            <SectionB  popupConditions={popupConditions} handleReset={handleReset} blogSection={blogSection} showPopup = {showPopup} setShowPopup ={setShowPopup} handlePopup={handlePopup} blogData={blogData}/>  

            <ReturnPopup/>

            {/* <Footer isInherit={true}/> */} {/* Footer is not needed in this page */}
        </div>
    )
}



function SectionBPopUpContent(props){
    const title = props.title;
    const blogData = props.blogData;
    // let blogData = props.blogData;
    let blog = blogData.find((blog) => blog.title === title);
    
    return (
        <div className="d-flex rounded mt-4 cards" >
            <div className="col-12 bg-transparent">
                <div className="popup-cards popup-words overflow-auto">
                    <img className="popup-img" src={blog.img}></img>
                    <h2 className="blog-title">{blog.title}</h2>
                    <p>
                        {blog.content}
                    </p>
                </div>
            </div>
            
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
                {/* <NavBar pageName = "Home"/> */} {/* NavBar is not needed in this page */}
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
        cardList.push(<Card setSectionBPopup={setSectionBPopup} key={blog.title} showPopup={showPopup} setShowPopup={setShowPopup} handlePopup={handlePopup} title={blog.title} description={blog.description}  img={blog.img}/>);
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
                        {/* button that add blogs with 2 margin */}
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

function Card(props){
    const [showPopup, setShowPopup, handlePopup, setSectionBPopup] = [props.showPopup, props.setShowPopup, props.handlePopup, props.setSectionBPopup];

    function set(){
        setSectionBPopup(true);
        
    }
    return (     
        <div className="d-flex col-lg-6 col-md-6 col-xs-12 col-xl-3 rounded mx-auto cards">
            <div className="col-12 position-center">
                <div className="card shadow-lg bg-light  home-cards">
                    <img className="card-img-top blog-card-img" src={props.img} alt="Card image cap"></img>
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">{props.description}</p>
                        <button id={props.title} href="#" className="btn btn-primary" aria-label="a button that leads to a pop up" onClick={() => {handlePopup(props.title); set();}}>Go see blog</button>
                    </div>
                </div>
            </div>
        </div>  
    )
}

function UploadForm(props){
    let [register, handleSubmit, onSubmit] = props.submitStuff;

    const [textAreaWidth, settextAreaWidth] = useState(Math.round(window.innerWidth/28));

    console.log(window.innerWidth)
    

    console.log(textAreaWidth)

    
    
    return(
        <form id="uploadForm" onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>Title:</Form.Label>
            <FormControl {...register("title")} type="text" name="title" ></FormControl>
            <Form.Text>     
            </Form.Text>

            <Form.Label>Image link:</Form.Label>
            <FormControl {...register("img")} type="text" name="img" ></FormControl>
            <Form.Text>
            </Form.Text>

            <Form.Label>Description of image:</Form.Label>
            <FormControl {...register("description")} type="text" name="description" ></FormControl>
            <Form.Text>
            </Form.Text>

            <Form.Label>Content:</Form.Label>
            <FormControl {...register("content")} type="text" name="content" as="textarea" rows={5}></FormControl>
            <Form.Text>
            </Form.Text>

            <div className="d-grid gap-2 my-3">
                <Button variant="secondary" type="submit" size="large">Submit</Button>
            </div>
            
        </form>
       
    )
}

