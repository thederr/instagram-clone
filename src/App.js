// Imports that are needed for the project

import React, { useState, useEffect } from "react";
import './App.css';
import Post from './Post';
import { db } from './Firebase';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles'

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

  useEffect(() => {
    db.collection("posts")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
  }, [])
  
  //everytime the post changes or a new one is added it will run the code again

  return (
    <div className="app">

      <Modal
        open={open}
        onClose={()=> setOpen(false)}// this listens to for clicks outside of the modal and closes if that's the case
      >
    <div style={modalStyle} className={classes.paper}>
      <h2>I am a modal</h2>
    </div>

      </Modal>

    
        <div className="app__header">
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="instagram logo"
            />
          </div>
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
