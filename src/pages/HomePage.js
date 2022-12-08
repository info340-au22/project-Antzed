import React, { useEffect } from "react";
import Popup from "../component/Popup";
//  import blogData from "../data/hiking-blog.json";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";

import { get, getDatabase, ref, set, onValue, query, child} from 'firebase/database';


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


   

    
    
    
   
    // console.log(returnedPopup.tosString());


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


    const [sectionBPopup, setSectionBPopup] = useState(false);
    const [uploadFormPopup, setUploadFormPopup] = useState(false);
    const popupConditions = [setSectionBPopup, setUploadFormPopup]
    const [returnedPopup, setReturnedPopup] = useState();
    console.log(sectionBPopup, uploadFormPopup);

    // if (uploadFormPopup){
    //     console.log(uploadFormPopup);
    //     setReturnedPopup(<Popup trigger={showPopup} setTrigger={setShowPopup} content={<UploadForm/>}/>)
        
    // }

    
    let blogStatus = "hide";
    let formStatus = "hide";
    if(showPopup && uploadFormPopup){
        formStatus = "show";
    }
    if(showPopup && sectionBPopup){
        blogStatus = "show";
    }
    
    // when the popup is closed, the popup will be hidden
    if(!showPopup){
        blogStatus = "hide";
        formStatus = "hide";
        if(sectionBPopup || uploadFormPopup){
            setSectionBPopup(false);
            setUploadFormPopup(false);
        }
    }


    
   

  

    // console.log("full blog data", FullBlogData);
    return (
        <div>
            <SectionA setQuery={setQuery} handleSearch={handleSearch}/>
            <SectionB popupConditions={popupConditions} handleReset={handleReset} blogSection={blogSection} showPopup = {showPopup} setShowPopup ={setShowPopup} handlePopup={handlePopup} blogData={blogData}/>  
               
            <div className={blogStatus}>
                <Popup setToFalse={setBlogData} trigger={showPopup} setTrigger={setShowPopup} content={<SectionBPopUpContent title={title} blogData={blogData}/>}/>
            </div>

            <div className={formStatus}>
                <Popup setToFalse={setUploadFormPopup} trigger={showPopup} setTrigger={setShowPopup} content={<UploadForm/>}/>
            </div>
            
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
                <div className="card shadow-lg  popup-words overflow-auto">
                    <img className="image" src={blog.img}></img>
                    <h2>{blog.title}</h2>
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
              <input type="search" className="form-control rounded" placeholder="Search for a blog, or a page by /(page name)" aria-label="a form for inputing wanted search terms" aria-describedby="search-addon" onChange={handleSearch} onKeyDown={handleKeyDown}/>
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

    let [exmapletext, setExampleText] = React.useState("");
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
                <div className="card shadow-lg bg-secondary  home-cards">
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
    return(
        <form>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}

