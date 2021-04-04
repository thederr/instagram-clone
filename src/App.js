// Imports that are needed for the project
import React from 'react';
import './App.css';
import Post from './Post';
// *********************** 
function App() {
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
      
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      {/*Posts*/}
      {/*Posts*/}

    </div>
  );
}

export default App;
