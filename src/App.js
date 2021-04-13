import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import {auth, db} from './Firebase';
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
  const [posts,setPosts]= useState([]);
  const [open, setOpen]= useState(false);
  const classes=useStyles();
  const [modalStyle]=useState(getModalStyle);
  const [username,setUsername]= useState("");
  const [email,setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [user,setUser]= useState(null);
  const [openSignIn,setOpenSignIn]= useState(false);



  useEffect(()=>{
    const unsubscribe =auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        //user has logged in
        console.log(authUser);
        setUser(authUser);

      }else{
        //user has logged out
        setUser(null);
      }
    })
    return () =>{
      // perform some cleanup actions before you refire the useEffect
      unsubscribe();
    }
  },[user,username]);// we include these because we are using these two values in the above code



useEffect(()=>{
  db.collection('posts').onSnapshot(snapshot =>{
  setPosts(snapshot.docs.map(doc =>({
     id:doc.id, 
     post: doc.data()
    })));
  });
},[]);

const signUp =(event)=>{
  event.preventDefault();
  auth.createUserWithEmailAndPassword(email,password)
  .then((authUser)=>{
    return authUser.user.updateProfile({
      displayName:username
    })
  })
  .catch((error)=>alert(error.message));
  
  setOpen(false);
};
//----------------- Here's where the preventDefault error is -------
  const signIn = (event) => {
  event.preventDefault();
  auth
    .signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))
    
    setOpenSignIn(false);
}

//----------------- Here's where the preventDefault error is -------

  return(
    <div className="app">
      <Modal open={open} onClose={()=> setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
          <center>
            <img
            className="app__headerImage"
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
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={()=> setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signin">
          <center>
            <img
            className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""        
            />
          </center>
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
            {/* dont do this --onClick={signIn()} */}
            <Button type="submit" onClick={signIn}>Sign In</Button>
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
      {user? (
      <Button type="submit" onClick={()=>auth.signOut()}>Logout</Button>
      ):(
        <div className="app__loginContainer">
      <Button type="submit" onClick={()=>setOpenSignIn(true)}>Sign In</Button>
      <Button type="submit" onClick={()=>setOpen(true)}>Sign Up</Button>
        </div>
      )}

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