import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import {db} from './Firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Input} from  '@material-ui/core';

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

function App(){
  const[posts,setPosts]= useState([]);
  const [open, setOpen]= useState(false);
  const classes=useStyles();
  const[modalStyle]=useState(getModalStyle);
  const[username,setUsername]= useState("");
  const [email,setEmail]= useState("");
  const [password, setPassword]=("");



useEffect(()=>{
  db.collection('posts').onSnapshot(snapshot =>{
  setPosts(snapshot.docs.map(doc =>({
     id:doc.id, 
     post: doc.data()
    })));
  });
},[]);

const signUp =(event)=>{

}

  return(
    <div className="app">
      <Modal open={open} onClose={()=> setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
          <center>
            <img
            className="app__modalHeaderImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""        
            />
          </center>
              <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
             <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            <Button onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
        className="app__headerImage"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""        
        />
      </div>

      <Button onClick={()=>setOpen(true)}>Sign Up</Button>

      <h1>hello</h1>
      {
        posts.map(({id, post}) =>(
          <Post key={id} username ={post.username} caption ={post.caption} imageURL={post.imageURL}/>
        ))
      }
     
     
    </div>
  )
}
export default App;