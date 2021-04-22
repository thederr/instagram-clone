// How the instagram post component is structured
/* 
Post
    Header
        Avatar
        Screen Name
        Location
    Image
    Username & Caption
*/

import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import { useState, useEffect } from "react";
import { Button, Input } from "@material-ui/core";


/*we would generally use the Post(props)
but we can use destructuring to pass our actual arguments into the 
post(arg1,arg2,arg3)
these come from the what is required for a unique post and those are
username,comment,imageURL so these go into Post(1,2,3) */

function Post({ user, postId, username, caption, imageURL }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName
    });
    setComment("");

  };

  return (
    <div className='post'>
      <div className='post__header'>
        <Avatar
          className='post__avatar'
          alt={username}
          src='/static/images/avatar/.png'
        />
        <h3>{username}</h3>
      </div>


      <img className='post__image' src={imageURL} alt='post' />

      <h4 className='post__text'>
        <strong>{username}</strong>: {caption}
      </h4>

      <div className='post__comments'>
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        
        ))}
      </div>

      <form className='post__commentBox'>
        <Input
          className='post__input'
          type='text'
          placeholder='Add a comment...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          className='post__button'
          disabled={!comment}
          type='submit'
          onClick={postComment}
        >
          Post
        </Button>
      </form>
    </div>
  );
}

export default Post;
