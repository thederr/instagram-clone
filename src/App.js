// Imports that are needed for the project

import React, { useState, useEffect } from "react";
import './App.css';
import Post from './Post';
import { db } from './Firebase';

/*  */
function App() {
  const [posts, setPosts] = useState([]);
  // useEffect --> runs a piece of code based on a specific condition

  useEffect(() => {
    db.collection("posts")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
  }, [])
  
  //everytime the post changes or a new one is added it will run the code again

//_____^^^^^^____________Current Problem is with the above code ________________
  return (
    <div className="app">
    
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
        posts.map(({id ,post}) => (
          <Post key={id} username= {post.username} caption= {post.caption} imageURL={post.imageURL} />
        ))

      }
    </div>
  )
}

export default App;
