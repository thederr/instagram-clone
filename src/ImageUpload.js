import React,{useState} from 'react'
import {Button, Input} from  '@material-ui/core';
import {storage, db} from './Firebase';
import firebase from "firebase";


function ImageUpload({username}) {
    const [caption,setCaption]=useState("");
    const [progress,setProgress]= useState(0);
    const [image,setImage]= useState(null);

    const handleChange= (event)=>{
        if (event.target.files[0]){
            setImage(event.targe.files[0]);
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
                        db.collection("posts").add({
                           // this allows for sorting posts by their timing
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageURL: url,
                            username: username
                        });
                        // after we post the image we set the user inputs back to their original state
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }
        )
    };

    return (
        <div>


            <progress value ={progress} max ="100%" ></progress>
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

export default ImageUpload
