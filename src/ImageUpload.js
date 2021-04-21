
import React,{useState} from 'react'
import {Button, Input} from  '@material-ui/core';
import {storage, db} from './firebase';
import firebase from 'firebase/app';
import "./imageUpload.css"
// it seems to be the case that the app is throwing an error 
// when the image is uloaded using the file selector it throws
// a typeerror cannot read property files
// of undefined.
// the most natural issue is with the handleuploader

function ImageUpload({username}) {
    const [caption,setCaption]=useState("");
    const [progress,setProgress]= useState(0);
    const [image,setImage]= useState(null);



    const handleChange = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleUpload=()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);// those are tildas and not commas
        uploadTask.on(
            "state_changed",
                (snapshot) =>{
                    //progress function ...
                const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) *100
                );
                setProgress(progress);
            },
            (error)=>{
                console.log(error);
                alert(error.message);
            },
            //when the upload completes what happens
            ()=>{
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()// getting the download link from firebase
                    .then((url) => {
                        //post image inside firestore database
                        db.collection("posts").add({
                            imageUrl: url,
                            caption: caption,
                            username: username,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                          });
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
    };
    return (
        <div className="imageupload">


            <progress className="imageupload__progress" value ={progress} max ="100" ></progress>
            <h1>Choose File and add a caption</h1>
            <Input 
                type="text" 
                placeholder="Enter a caption..." 
                onChange={event=>setCaption(event.target.value)} 
                value={caption}>
            </Input>
            
            <Input 
                type="file" 
                onChange={handleChange}>
            </Input>

            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload;

// where is the error at??
// one of the errors was in the ImageUpload
// one error is the that when i select the image and uload/ post 
// the image doesn't show up.