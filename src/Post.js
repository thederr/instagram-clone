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

import React from 'react'
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";



/*we would generally use the Post(props)
but we can use destructuring to pass our actual arguments into the 
post(arg1,arg2,arg3)
these come from the what is required for a unique post and those are
username,comment,imageURL so these go into Post(1,2,3) */

function Post({username, caption, imageURL}) {

    return (
        <div className="post">
            <div className="post__header">{/* we are wrapping the avatar and the username inside a container so that we can make them be on the same line*/}
            <Avatar
                className="post__avatar"
                alt="Derrmatheny"
                src="/static/images/avatar/.png"
            
            />
            {/*<h3>Username</h3>*/}
            <h3>{username}</h3>
            
            </div>{/* header wrapper ends here */}

            {/* What we are doing below is making the hard coded values that are commented out
            dynamic values that can be changed */}


            {/*<img className="post__image" src="https://yt3.ggpht.com/a-/AAuE7mDMgJdxLr67xIch3lj0egc9RZXiZhMXIglFew=s900-mo-c-c0xffffffff-rj-k-no"/>*/}
            <img className="post__image" src={imageURL} alt=""/>


            {/*<h4 className="post__text"><strong>DerrMatheny</strong>: Wow thats a big image!!</h4>*/}
            <h4 className="post__text"><strong>{username}</strong>: {caption}</h4>
            
            

        </div>
    )
};

export default Post
