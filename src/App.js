// Imports that are needed for the project

import React, { useState, useEffect } from "react";
import './App.css';
import Post from './Post';
import { db } from './Firebase';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles'
import {Button, Input,FormControl} from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    height: "300px",
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    height: 200,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

/*  */
function App() {
  const classes=useStyles();
  const [modalStyle]= useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen]= useState(false);
  // useEffect --> runs a piece of code based on a specific condition
  
  
  //--- Setting up states for input fields----
  const [username, setUsername]= useState("");
  const [password, setPassword]= useState("");
  const [email, setEmail]= useState("");
  //--- Setting up states for input fields----

  useEffect(() => {
    db.collection("posts")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
  }, [])
  
  //everytime the post changes or a new one is added it will run the code again
const signUp = (event)=>{

}
  return (
    <div className="app">

      <Modal
      //the user login code will reside within the modal
        open={open}
        onClose={()=> setOpen(false)}// this listens to for clicks outside of the modal and closes if that's the case
      >
    <div style={modalStyle} className={classes.paper}>

    <form className="app__signup">
      <center>
        {/* adding instagram image to modal */}
        <img 
        className="app__headerImage"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt="instagram logo"
        />


        {/* Building the input fields */}
        <Input
        placeholder ="username"
        type ="text"
        value={username}
        onChange={(e)=> setUsername(e.target.value)}
        />

        
        <Input
        placeholder ="email"
        type ="text"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        />

        <Input
        placeholder ="passsword"
        type ="text"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        />

      <Button onClick={signUp}>Sign Up!</Button>

      </center>
    </form>

  </div>



      </Modal>

    
        <div className="app__header">
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="instagram logo"
            />
          </div>
            {/* Building User Input */}
          <Button onClick={()=> setOpen(true)}>Sign Up!</Button>

      <h1>This will most likely get me sued</h1>
            
            {/* you can think of this as looping through all the posts that are generated */}
      { // literally when you use js stop forgetting to include the curly boys {}
        posts.map(({id ,post}) => (
          <Post key={id} username= {post.username} caption= {post.caption} imageURL={post.imageURL} />
        ))

      }
    </div>
  )
}

export default App;
