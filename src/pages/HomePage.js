import React from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import Popup from "../component/Popup";
import blogData from "../data/hiking-blog.json";
import { useNavigate } from "react-router-dom";

// Todo: search bar search implement
// Todo: search bar hid in small screens
// Todo: hamburger menu

// Todo: fix popup
let title;
let searchResult;

export default function HomePage(props) {

    const [showPopup, setShowPopup] = React.useState(false);
    function handlePopup(key){
        setShowPopup(true);
        title = key;
    }


    const [query, setQuery] = React.useState("");
    function handleSearch(event){
        event.preventDefault();
        searchResult = event.target.value
        // console.log(searchResult);
    }
    console.log(query);
    
    const navigate = useNavigate();
    // navigate to trail page is query equals to "trail"
    if(query === "trail"){
        navigate("/trail");
    }
    // navigate to shop page is query equals to "shop"
    if(query === "shop"){
        navigate("/shop");
    }
    // navigate to user page if query equals to "user"
    if(query === "user"){
        navigate("/user");
    }

    return (
        <div>
            <SectionA setQuery={setQuery} handleSearch={handleSearch}/>
            <SectionB showPopup = {showPopup} setShowPopup ={setShowPopup} handlePopup={handlePopup} />  
            <Popup trigger={showPopup} setTrigger={setShowPopup} content={<PopUpContent title={title}/>}/> 
            <Footer isInherit={true}/>
        </div>
    )
}

function PopUpContent(props){
    const title = props.title;
    let blog = blogData.find((blog) => blog.title === title);
    console.log(blog);
    
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
    return (
        <div className={searchBarStyle}>
          <div className="align-item-center justify-content-center px-5">
            <div className="input-group rounded">
              <input type="search" className="form-control rounded" placeholder="Search for a page" aria-label="Search" aria-describedby="search-addon" onChange={handleSearch}/>
              <span className="input-group-text border-0" id="search-addon">
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={() => setQuery(searchResult)}>Search</button>
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
                <NavBar pageName = "Home"/>
                
                <SearchBar setQuery = {setQuery} handleSearch={handleSearch}/>
            </section>
        </div>
    )
}





function SectionB(props){
    

    // pattern-diagonal-lines-sm 
    // review-background pattern-diagonal-lines-sm 
    let sectionBStyle = "home-sectionB height-100vh review-background  pattern-diagonal-lines-sm  overflow-auto ";


    const [showPopup, setShowPopup, handlePopup] = [props.showPopup, props.setShowPopup, props.handlePopup];

    
    const cardList = [];

    // map the blogData to cardList using Card component
    blogData.map((blog) => {
        cardList.push(<Card key={blog.title} showPopup={showPopup} setShowPopup={setShowPopup} handlePopup={handlePopup} title={blog.title} description={blog.description}  img={blog.img}/>);
    })

    return(
        <div >
            <section className={sectionBStyle}>
                <div className="container">
                    <div className="row">
                        {cardList}
                    </div>
                </div>
            </section>
        </div>
        
    )

}

function Card(props){
    const [showPopup, setShowPopup, handlePopup] = [props.showPopup, props.setShowPopup, props.handlePopup];

    
    return (     
        <div className="d-flex col-lg-6 col-md-6 col-xs-12 col-xl-3 rounded mx-auto cards">
            <div className="col-12 position-center">
                <div className="card shadow-lg bg-secondary  home-cards">
                    <img className="card-img-top blog-card-img" src={props.img} alt="Card image cap"></img>
                    <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <button id={props.title} href="#" className="btn btn-primary" onClick={() => handlePopup(props.title)}>Go see blog</button>
                    
                    </div>
                </div>
            </div>
        </div>

        
        
    )

}

