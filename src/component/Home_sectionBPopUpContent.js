import React from 'react';

export function SectionBPopUpContent(props){
    const title = props.title;
    const blogData = props.blogData;
    let blog = blogData.find((blog) => blog.title === title);
    
    return (
        <div className="d-flex rounded mt-4 cards" >
            <div className="col-12 bg-transparent">
                <div className="popup-cards popup-words overflow-auto">
                    <img className="popup-img" src={blog.img}></img>
                    <h2 className="blog-title">{blog.title}</h2>
                    <p>{blog.author}</p>
                    <p>
                        {blog.content}
                    </p>
                </div>
            </div>
            
        </div>
    )
}