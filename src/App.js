// Imports that are needed for the project
import React, { useState, useEffect } from "react";
import './App.css';
import Post from './Post';
import { db } from './Firebase';

/*  */
function App() {
  const [posts, setPosts] = useState([

  {
    username: "derrmatheny",
    caption:  "ffddsfdsf",
    imageURL: ""
  },
  {
    username: "derrmatheny",
    caption:  "ssdfghjkhgfxvbrhtytrwef",
    imageURL: ""
  }
]);

  // useEffect --> runs a piece of code based on a specific condition

  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot=> {
      setPosts(snapshot.docs.map( doc=> doc.data()))
    })
  },[]) //everytime posts changes it will run the code again
  
  return (
    <div className="app">
     
      {/*Setting up the structure of the instagram app
      this will include headers, posts, icons, images and the like*/}
      
      {/*Header*/}
      {/*Header contains instagram image and navagation aligned right*/}
        <div className="app__header">
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="instagram logo"
            />
          </div>
      <h1>This will most likely get me sued</h1>
            
            {/* you can think of this as looping through all the posts that are generated */}
      {
        posts.map(post => (
          <Post username= {post.username} caption= {post.caption} imageURL={post.imageURL} />
        ))

      }

      {/*Understanding that we will be making each post unique and what this will mean for the structure of the post components */}
      
      {/*Posts*/}
      {/*Posts*/}

    </div>
  )
};

export default App;
