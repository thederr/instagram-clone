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


function Post() {
    return (
        <div className="post">
            <div className="post__header">{/* we are wrapping the avatar and the username inside a container so that we can make them be on the same line*/}
            <Avatar
                className="post__avatar"
                alt="Derrmatheny"
                src="/static/images/avatar/.png"
            
            />
            <h3>Username</h3>
            </div>{/* header wrapper ends here */}


            <img className="post__image" src="https://yt3.ggpht.com/a-/AAuE7mDMgJdxLr67xIch3lj0egc9RZXiZhMXIglFew=s900-mo-c-c0xffffffff-rj-k-no"/>

            <h4 className="post__text"><strong>DerrMatheny</strong>: Wow thats a big image!!</h4>

        </div>
    )
}

export default Post
