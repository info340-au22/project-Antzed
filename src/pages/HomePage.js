import React from "react";
import Popup from "../component/Popup";
//  import blogData from "../data/hiking-blog.json";
import { useNavigate } from "react-router-dom";

import { get, getDatabase, ref, set, onValue, query, child} from 'firebase/database';


let title;
let searchResult;

export default function HomePage(props) {
    
    const [blogData, setBlogData] = React.useState([]);

    const db = getDatabase();
    let blogRef = ref(db, 'blogs');

    let blogData_firebase = get(blogRef).then((snapshot) => {

        let blogData_temp = snapshot.val();

        return blogData_temp;
    }).catch((error) => {
        console.error(error);
    });

    blogData_firebase.then((value) => {
        setBlogData(value);
    })


    const [showPopup, setShowPopup] = React.useState(false);
    function handlePopup(key){
        setShowPopup(true);
        title = key;
    }


    const [query, setQuery] = React.useState("");
    function handleSearch(event){
        event.preventDefault();
        searchResult = event.target.value.toLowerCase();
    }
    console.log(query);
    
    const navigate = useNavigate();


    if(query === "trail"){
        navigate("/trail");
    }
    if (query === "shop"){
        navigate("/shop");
    }
    if(query === "user"){
        navigate("/user");
    }

    let titleText2 = "Discover the world with us";

    return (
        <div>
            <SectionA setQuery={setQuery} handleSearch={handleSearch}/>
            <SectionB showPopup = {showPopup} setShowPopup ={setShowPopup} handlePopup={handlePopup} blogData={blogData}/>  
            <Popup trigger={showPopup} setTrigger={setShowPopup} content={<PopUpContent title={title} blogData={blogData}/>} /> 
            {/* <Footer isInherit={true}/> */} {/* Footer is not needed in this page */}
        </div>
    )
}

function PopUpContent(props){
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
    return (
        <div className={searchBarStyle}>
          <div className="align-item-center justify-content-center px-5">
            <div className="input-group rounded">
              <input type="search" className="form-control rounded" placeholder="Search for a page" aria-label="a form for inputing wanted search terms" aria-describedby="search-addon" onChange={handleSearch}/>
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

    
    let blogData = props.blogData;

    blogData.map((blog) => {
        cardList.push(<Card key={blog.title} showPopup={showPopup} setShowPopup={setShowPopup} handlePopup={handlePopup} title={blog.title} description={blog.description}  img={blog.img}/>);
    })

    return(
        <div >
            <section className={sectionBStyle}>
                <div className="container">
                    <div className="row">
                        <td>
                            {cardList}
                        </td>
                        
                        
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
                        <button id={props.title} href="#" className="btn btn-primary" aria-label="a button that leads to a pop up" onClick={() => handlePopup(props.title)}>Go see blog</button>
                    </div>
                </div>
            </div>
        </div>  
    )
}

